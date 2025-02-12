import os
import openai
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_response(compliance_report):
    try:
        client = openai.OpenAI(api_key=openai.api_key)  

        response = client.chat.completions.create(
            model="gpt-4",  
            messages=[
                {"role": "system", "content": "You are a compliance expert reviewing financial documents."},
                {"role": "user", "content": f"Analyze this compliance report and provide insights:\n\n{compliance_report}"}
            ],
            temperature=0.5,
            max_tokens=500
        )

        return response.choices[0].message.content.strip() if response.choices else "No response generated."

    except openai.OpenAIError as e:
        return f"OpenAI API error: {str(e)}"

    except Exception as e:
        return f"An error occurred: {str(e)}"
