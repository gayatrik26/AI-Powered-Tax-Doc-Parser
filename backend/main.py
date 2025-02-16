from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from backend.services.file_processing import extract_text_from_pdf
from backend.models.ner import extract_entities
from backend.models.compliance import check_compliance
from backend.services.chatbot import generate_response
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

@app.post("/upload-pdf/")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        content = await file.read()
        file_path = f"/tmp/{file.filename}" 

        with open(file_path, "wb") as f:
            f.write(content)

        print(f"File saved at {file_path}")

        extracted_text = extract_text_from_pdf(file_path)
        print("Extracted Text:", extracted_text)

        entities = extract_entities(extracted_text)
        print("Entities:", entities)

        compliance_report = check_compliance(entities)
        print("Compliance Report:", compliance_report)

        chatbot_response = generate_response(compliance_report)
        print("Chatbot Response:", chatbot_response)

        os.remove(file_path) 

        return {
            "message": "File processed successfully",
            "extracted_text": extracted_text,
            "entities": entities,
            "compliance_report": compliance_report,
            "chatbot_response": chatbot_response
        }

    except Exception as e:
        print("Error:", str(e))
        return {"error": "File processing failed", "details": str(e)}

@app.get("/")
def home():
    return {"message": "AI-powered Tax Document Parser is running!"}

# uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
