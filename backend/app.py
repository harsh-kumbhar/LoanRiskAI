from flask import Flask, request, jsonify
from flask_cors import CORS
from utils import extract_data_from_pdf
from model_core import get_loan_prediction
import datetime

app = Flask(__name__)
CORS(app)

# In-memory "Database" for the Bank Dashboard
applications_db = []

# REAL-LIFE LOAN PRODUCTS
LOAN_PRODUCTS = [
    {"id": "sal_plus", "name": "HDFC-Style Salary Plus", "desc": "Pre-approved personal loan for salaried professionals", "base_tenure": "60m"},
    {"id": "asset_backed", "name": "SBI-Style Asset-Backed", "desc": "High-value credit secured against residential assets", "base_tenure": "180m"},
    {"id": "mudra_biz", "name": "MUDRA-Style Growth Loan", "desc": "Collateral-free business loan for entrepreneurs", "base_tenure": "36m"}
]

@app.route('/api/plans', methods=['GET'])
def get_plans():
    return jsonify(LOAN_PRODUCTS)

# STEP 1: PDF Analysis (Returns data to the "Review Form")
@app.route('/api/analyze_pdf', methods=['POST'])
def analyze_pdf():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files['file']
    extracted = extract_data_from_pdf(file)
    return jsonify(extracted)

# STEP 2: Final Submission (Called after the user reviews/edits the form)
@app.route('/api/submit_application', methods=['POST'])
def submit_application():
    user_data = request.json  # Current data in the form
    original_data = user_data.get('original_extracted', {}) # Data before user edits
    
    # 1. Detect Integrity (Check if user changed values)
    edited_fields = []
    for key in ['income', 'cibil', 'loan_amount']:
        if str(user_data.get(key)) != str(original_data.get(key)):
            edited_fields.append(key)

    # 2. Run AI Prediction
    # Normalize income to annual if user entered monthly
    income = float(user_data['income'])
    if income < 1000000: income *= 12 
    
    model_input = {
        **user_data,
        "income": income,
        "loan_amt": float(user_data['loan_amount']),
        "cibil": int(user_data['cibil']),
        "term": int(user_data['term']),
        "dependents": int(user_data['dependents'])
    }
    
    ai_prediction = get_loan_prediction(model_input)
    
    # 3. Store in Banker Dashboard
    application_entry = {
        "id": len(applications_db) + 1,
        "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M"),
        "applicant_name": user_data.get('name', 'Applicant'),
        "loan_product": user_data.get('product_name'),
        "ai_status": ai_prediction.get('status'),
        "ai_confidence": ai_prediction.get('probability'),
        "offered_rate": ai_prediction.get('suggested_rate'),
        "integrity_flag": "User Edited" if edited_fields else "Clean",
        "edited_fields": edited_fields,
        "full_details": model_input
    }
    applications_db.append(application_entry)
    
    return jsonify({"result": ai_prediction, "app_id": application_entry['id']})

# STEP 3: Admin/Banker Dashboard
@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    data = request.json
    if data.get('password') == "admin123": # Hardcoded Banker Password
        return jsonify({"auth": True})
    return jsonify({"auth": False}), 401

@app.route('/api/admin/applications', methods=['GET'])
def get_admin_data():
    return jsonify(applications_db)

if __name__ == '__main__':
    app.run(debug=True, port=5000)