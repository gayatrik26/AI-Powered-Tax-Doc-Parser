import spacy
import re
from collections import defaultdict

nlp = spacy.load("en_core_web_sm")

INVALID_ENTITIES = {"Stolen Card", "BUILDING BLOCKS STUDENT HANDOUT"}
MISCLASSIFIED_PERSONS = {"ATM Withdrawal", "Salary Credit"}
MISCLASSIFIED_GPE = {"Netflix", "Spotify"}

DATE_PATTERNS = [
    r"\b\d{4}-\d{2}-\d{2}\b",  # YYYY-MM-DD
    r"\b\d{2}/\d{2}/\d{4}\b",  # MM/DD/YYYY or DD/MM/YYYY
    r"\b\d{2}-\d{2}-\d{4}\b",  # MM-DD-YYYY or DD-MM-YYYY
    r"\b(January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}, \d{4}\b",  # Month Day, Year
    r"\b\d{1,2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}\b",  # D MMM YYYY
    r"\b\d{4}\b"  # Only standalone years if necessary
]

# Pattern to detect money (e.g., Rs.1,00,000.00)
MONEY_PATTERN = r"Rs\.\s?[\d,]+(?:\.\d{1,2})?"

def is_valid_date(entity_text):
    """Check if the given text matches common date formats."""
    return any(re.match(pattern, entity_text) for pattern in DATE_PATTERNS)

def extract_money(text):
    """Extract monetary values using regex."""
    return re.findall(MONEY_PATTERN, text)

def extract_entities(text: str) -> dict:
    """
    Extract named entities from the given text while filtering out misclassified entries.
    """
    doc = nlp(text)
    extracted_data = defaultdict(set)

    extracted_data["MONEY"].update(extract_money(text))

    for ent in doc.ents:
        entity_text = ent.text.strip()

        if entity_text in INVALID_ENTITIES:
            continue

        if ent.label_ == "PERSON" and entity_text in MISCLASSIFIED_PERSONS:
            continue

        if ent.label_ == "GPE" and entity_text in MISCLASSIFIED_GPE:
            extracted_data["ORG"].add(entity_text)  
            continue

        if ent.label_ == "DATE" and not is_valid_date(entity_text):
            continue  

        if ent.label_ != "MONEY" and "Rs." in entity_text:
            extracted_data["MONEY"].add(entity_text)
            continue

        extracted_data[ent.label_].add(entity_text)

    return {key: list(values) for key, values in extracted_data.items()}