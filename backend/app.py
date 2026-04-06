from flask import Flask, request, jsonify
from flask_cors import CORS
from utils import extract_data_from_pdf
from model_core import get_loan_prediction
import datetime

app = Flask(__name__)
CORS(app)

applications_db = []

@app.route('/api/analyze_pdf', methods=['POST'])
def analyze_pdf():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    file = request.files['file']
    extracted = extract_data_from_pdf(file)
    return jsonify(extracted)

@app.route('/api/submit_application', methods=['POST'])
def submit_application():
    try:
        user_data = request.json
        original_data = user_data.get('original_extracted', {})
        
        # Integrity Check
        edited_fields = []
        for key in ['income', 'cibil', 'loan_amount']:
            if str(user_data.get(key)) != str(original_data.get(key)):
                edited_fields.append(key)

        # AI Prediction
        prediction = get_loan_prediction(user_data)
        
        # Save to Bank DB
        app_entry = {
            "id": len(applications_db) + 1,
            "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M"),
            "applicant_name": user_data.get('name', 'Applicant'),
            "ai_status": prediction.get('status'),
            "ai_confidence": prediction.get('probability'),
            "integrity_flag": "User Edited" if edited_fields else "Clean",
            "edited_fields": edited_fields
        }
        applications_db.append(app_entry)
        
        return jsonify({"result": prediction, "app_id": app_entry['id']})
    except Exception as e:
        print(f"SERVER ERROR: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    if request.json.get('password') == "admin123":
        return jsonify({"auth": True})
    return jsonify({"auth": False}), 401

@app.route('/api/admin/applications', methods=['GET'])
def get_admin_data():
    return jsonify(applications_db)

if __name__ == '__main__':
    app.run(debug=True, port=5000)