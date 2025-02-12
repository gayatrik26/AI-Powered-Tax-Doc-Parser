# import pdfplumber
# import json
# import os

# def extract_text_from_pdf(pdf_file: str) -> str:
#     text = ""
#     with pdfplumber.open(pdf_file) as pdf:
#         for page in pdf.pages:
#             extracted_text = page.extract_text()
#             if extracted_text:
#                 text += extracted_text + "\n\n"
#     return text.strip()

# # Define the input PDF path
# pdf_path = os.path.join(os.path.dirname(__file__), "data", "statement_sample1.pdf")

# # Extract text from the PDF
# pdf_text = extract_text_from_pdf(pdf_path)

# # Define the output file path in the same folder as the script
# output_file = os.path.join(os.path.dirname(__file__), "extracted_text.json")

# # Save the extracted text
# with open(output_file, "w") as f:
#     json.dump({"text": pdf_text}, f)

# print(f" Extracted text saved successfully at: {output_file}")



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
