from openai import OpenAI
import os
from dotenv import load_dotenv
import json
load_dotenv()

print("Loaded API Key:", repr(os.environ.get("OPENAI_API_KEY")))
# OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
# OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
# OPENAI_API_KEY = "sk-ju5ornhnGG3g_mAVhQRAfz9Pz0m5F_8Grgt5hkr5dKT3BlbkFJbde_r04ZpaxcPD-b6ccw5tPlqTbzTmhqmp24MO60QA"
OPENAI_API_KEY = "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"
if not OPENAI_API_KEY:
    raise ValueError("Missing OpenAI API Key. Please set OPENAI_API_KEY as an environment variable.")

client = OpenAI(api_key=OPENAI_API_KEY)
print(f"Loaded API Key: {OPENAI_API_KEY}")
print(repr(OPENAI_API_KEY))  # Debugging step


def check_compliance(entities):
    """
    Function to check compliance of extracted entities using OpenAI's model.
    Returns a JSON response or an error.
    """
    sanitized_entities = str(entities).replace("{", "{{").replace("}", "}}")  # Escape curly braces

    prompt = f"""
    You are a tax compliance expert. Analyze the following extracted tax data for compliance issues.  
    Ignore any formatting inconsistencies, date irregularities, or entity recognition errors.  
    Assume all data is correctly structured and valid. {sanitized_entities} 

    Your task is to assess the data **purely from a tax compliance perspective** and highlight potential issues related to tax reporting, legal obligations, and regulatory adherence.  

    Provide a JSON report in the following structure:  
    {{
        "discrepancies": ["List only genuine compliance issues, such as missing tax documentation, incorrect categorization, unreported taxable income, or potential fraud risks."],
        "compliance_assessment": "Summarize compliance status based only on regulatory risks and obligations.",
        "recommendations": ["Provide tax-related action steps to improve compliance, such as audit suggestions, reclassification of expenses, or necessary documentation updates."]
    }} 
    """

    try:
        response = client.chat.completions.create(
            model="gpt-4-turbo",
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"}
        )

        # Ensure valid JSON response
        compliance_report = response.choices[0].message.content.strip()
        return json.loads(compliance_report)  # Converts string to JSON

    except json.JSONDecodeError:
        return {"error": "Invalid JSON response from OpenAI"}
    except Exception as e:
        return {"error": f"API Error: {str(e)}"}
