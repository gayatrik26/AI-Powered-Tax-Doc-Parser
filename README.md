# AI Tax Document Parser

## 📌 Overview
AI-powered tax document parser that:
- Processes tax returns, bank statements, etc.
- Extracts and parses critical information (income, deductions, dates).
- Uses AI for compliance checks and optional optimizations.
- Integrates with a conversational agent to explain issues.

## 🛠 Features
- **Document Parsing:** Extracts text from PDFs using `pdfplumber` or `PyMuPDF`.
- **Named Entity Recognition (NER):** Identifies key entities using `spaCy` or OpenAI's LLM.
- **Compliance Advisory:** Compares extracted data against tax regulations and provides recommendations.
- **Backend API:** Built using `Node.js` with `Express.js`.
- **Frontend Interface:** Web UI for uploading documents and viewing parsed results.

## 📂 File Structure
```
📦 AI-Tax-Parser
├── 📁 backend
│   ├── 📄 server.js           # Node.js backend API
│   ├── 📄 ner.js              # Named Entity Recognition (NER) using spaCy/OpenAI
│   ├── 📄 parser.js           # Document parsing logic
│   ├── 📄 compliance.js       # Compliance checking module
│   ├── 📄 package.json        # Backend dependencies
│   ├── 📄 .env                # Environment variables
│   └── 📁 data                # Processed JSON files
├── 📁 frontend
│   ├── 📄 index.html          # Main UI page
│   ├── 📄 app.js              # Frontend logic (React/Vue)
│   ├── 📄 styles.css          # UI styling
│   └── 📁 assets              # UI assets
├── 📁 model
│   ├── 📄 ner_model.pkl       # (Optional) Fine-tuned NER model
├── 📁 data
│   ├── 📄 sample.pdf          # Sample document for testing
│   ├── 📄 extracted_text.json # Extracted text from PDF
│   ├── 📄 ner_output.json     # Extracted entities (JSON format)
├── 📄 README.md
└── 📄 requirements.txt        # Python dependencies
```

## 🚀 Setup Instructions

### Backend (Node.js)
1. Install dependencies:
   ```sh
   cd backend
   npm install
   ```
2. Start the server:
   ```sh
   npm run dev
   ```

### Frontend (React)
1. Navigate to frontend:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the frontend:
   ```sh
   npm start
   ```

### Python Environment (for NER)
1. Create a virtual environment:
   ```sh
   python -m venv env
   source env/bin/activate  # (Linux/Mac)
   env\Scripts\activate  # (Windows)
   ```
2. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
3. Run the NER script:
   ```sh
   python backend/ner.py
   ```

## 📊 Example Output
```json
{
  "INCOME": ["175,800.00", "510,000.00"],
  "DEDUCTIONS": ["94,000.00", "80,000.00"],
  "TAX_YEAR": ["2023"]
}
```

## 🤖 Future Enhancements
- **Support for more document formats (CSV, DOCX)**
- **Integration with cloud-based tax APIs**
- **Better AI-driven anomaly detection**
