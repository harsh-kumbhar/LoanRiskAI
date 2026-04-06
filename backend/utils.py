import pypdf
import re

def extract_data_from_pdf(pdf_file):
    reader = pypdf.PdfReader(pdf_file)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + " "

    # Helper function: returns None if not found so UI can flag it
    def find_val(pattern):
        match = re.search(pattern, text, re.IGNORECASE)
        return int(match.group(1)) if match else None

    return {
        "income": find_val(r"(?:Salary|Income|Pay|Monthly)[:\s]*(\d+)"),
        "cibil": find_val(r"(?:CIBIL|Credit|Score)[:\s]*(\d{3})"),
        "loan_amount": find_val(r"(?:Loan|Amount|Requested)[:\s]*(\d+)"),
        "term": find_val(r"(?:Term|Tenure|Period|Months)[:\s]*(\d+)"),
        "dependents": find_val(r"(?:Dependents|Family|Children)[:\s]*(\d+)"),
        "education": "Graduate" if re.search(r"Graduate", text, re.I) else "Not Graduate",
        "self_employed": "Yes" if re.search(r"(Self-Employed|Business|Owner|Proprietor)", text, re.I) else "No"
    }