from openai import OpenAI
import os

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise ValueError("Missing OpenAI API Key. Please set OPENAI_API_KEY as an environment variable.")

client = OpenAI(api_key=OPENAI_API_KEY)

def check_compliance(entities):
    """
    Function to check compliance of extracted entities using OpenAI's model.
    :param entities: Extracted entity dictionary from the parsed document.
    :return: Compliance report as a dictionary.
    """
    prompt = f"""
    You are a tax compliance expert. Analyze the following extracted tax data for any compliance issues:
    {entities}

    Provide a structured report indicating:
    - Any discrepancies or missing information.
    - Compliance with standard tax regulations.
    - Recommendations for improvements.

    Return the response in a structured JSON format.
    """

    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )

    compliance_report = response.choices[0].message.content.strip()
    
    return compliance_report
