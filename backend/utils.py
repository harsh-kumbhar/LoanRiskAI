import pypdf
import re

def extract_data_from_pdf(pdf_file):
    """
    Extracts Salary and CIBIL score from a PDF document using regex.
    """
    reader = pypdf.PdfReader(pdf_file)
    text = ""
    for page in reader.pages:
        text += page.extract_text()

    # Regex logic to find values
    # Looks for "Net Pay: 50000" or "Total Salary 75000"
    income_match = re.search(r"(?:Net|Total|Monthly)\s*(?:Salary|Pay|Income)[:\s]*(\d+)", text, re.IGNORECASE)
    
    # Looks for "CIBIL Score: 750" or "Credit Score 800"
    cibil_match = re.search(r"(?:CIBIL|Credit)\s*Score[:\s]*(\d{3})", text, re.IGNORECASE)

    # Looks for a requested loan amount (optional)
    loan_match = re.search(r"(?:Requested|Loan)\s*Amount[:\s]*(\d+)", text, re.IGNORECASE)

    return {
        "income": int(income_match.group(1)) if income_match else 0,
        "cibil": int(cibil_match.group(1)) if cibil_match else 0,
        "loan_amount": int(loan_match.group(1)) if loan_match else 500000 # Default if not found
    }