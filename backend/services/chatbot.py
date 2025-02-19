# 

import os
import openai
from dotenv import load_dotenv

load_dotenv("backend/.env")

OPENAI_API_KEY = "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"
# OPENAI_API_KEY = "sk-ju5ornhnGG3g_mAVhQRAfz9Pz0m5F_8Grgt5hkr5dKT3BlbkFJbde_r04ZpaxcPD-b6ccw5tPlqTbzTmhqmp24MO60QA"

def generate_response(compliance_report):
    try:
        client = openai.OpenAI(api_key=OPENAI_API_KEY)  

        prompt = f"""
        You are a tax compliance expert.  
        Review the following compliance report and provide insights strictly from a **regulatory compliance perspective**:  
        
        {compliance_report}

        Your response should include:
        - **Key compliance risks**: Identify specific tax reporting, misclassification, or missing documentation risks.
        - **Regulatory concerns**: Highlight any potential violations or non-adherence to tax laws.
        - **Actionable recommendations**: Provide steps to improve compliance, such as audits, documentation improvements, or reclassification of transactions.
        """

        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a compliance expert reviewing financial documents."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.5,
            max_tokens=500
        )

        return response.choices[0].message.content.strip() if response.choices else "No response generated."

    except openai.OpenAIError as e:
        return f"OpenAI API error: {str(e)}"

    except Exception as e:
        return f"An error occurred: {str(e)}"
