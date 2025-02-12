import spacy
from collections import defaultdict

nlp = spacy.load("en_core_web_sm")

INVALID_ENTITIES = {"Stolen Card", "BUILDING BLOCKS STUDENT HANDOUT"}

def extract_entities(text: str) -> dict:
    """
    Extract named entities from the given text while filtering out misclassified entries.
    """
    doc = nlp(text)
    extracted_data = defaultdict(set)  

    for ent in doc.ents:
        entity_text = ent.text.strip()

        if entity_text in INVALID_ENTITIES:
            continue  

        extracted_data[ent.label_].add(entity_text)

    return {key: list(values) for key, values in extracted_data.items()}