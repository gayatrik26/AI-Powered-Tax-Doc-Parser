from fastapi import FastAPI, UploadFile, File
from backend.services.file_processing import extract_text_from_pdf
from backend.models.ner import extract_entities
from backend.models.compliance import check_compliance
from backend.services.chatbot import generate_response

app = FastAPI()

@app.post("/upload-pdf/")
async def upload_pdf(file: UploadFile = File(...)):
    """
    API to upload a PDF file, extract text, perform NER, and run compliance checks.
    """
    content = await file.read()
    file_path = f"/tmp/{file.filename}" 

    with open(file_path, "wb") as f:
        f.write(content)

    extracted_text = extract_text_from_pdf(file_path)

    entities = extract_entities(extracted_text)

    compliance_report = check_compliance(entities)

    chatbot_response = generate_response(compliance_report)

    return {
        "extracted_text": extracted_text,
        "entities": entities,
        "compliance_report": compliance_report,
        "chatbot_response": chatbot_response
    }

@app.get("/")
def home():
    return {"message": "AI-powered Tax Document Parser is running!"}


# uvicorn backend.main:app --reload