import pypdf
import re

def extract_data_from_pdf(pdf_file):
    reader = pypdf.PdfReader(pdf_file)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + " "

    # Helper function to find numbers
    def find_val(pattern, default):
        match = re.search(pattern, text, re.IGNORECASE)
        return int(match.group(1)) if match else default

    # Extracting numerical data
    income = find_val(r"(?:Salary|Income|Pay)[:\s]*(\d+)", 50000)
    cibil = find_val(r"(?:CIBIL|Credit|Score)[:\s]*(\d{3})", 700)
    loan_amt = find_val(r"(?:Loan|Amount|Requested)[:\s]*(\d+)", 1000000)
    term = find_val(r"(?:Term|Tenure|Period)[:\s]*(\d+)", 12)
    deps = find_val(r"(?:Dependents|Family)[:\s]*(\d+)", 0)

    # Extracting categorical data
    edu = "Graduate" if re.search(r"Graduate", text, re.I) else "Not Graduate"
    emp = "Yes" if re.search(r"(Self-Employed|Business|Owner)", text, re.I) else "No"

    return {
        "income": income,
        "cibil": cibil,
        "loan_amount": loan_amt,
        "term": term,
        "dependents": deps,
        "education": edu,
        "self_employed": emp
    }