import pdfplumber

def extract_text_from_pdf(pdf_file: str) -> str:
    """
    Extract text from a given PDF file.
    """
    text = ""
    with pdfplumber.open(pdf_file) as pdf:
        for page in pdf.pages:
            extracted_text = page.extract_text()
            if extracted_text:
                text += extracted_text + "\n\n"
                
    return text.strip()