from flask import Flask, request, jsonify
from flask_cors import CORS
from utils import extract_data_from_pdf
from models.model_core import get_loan_prediction
import os

app = Flask(__name__)
CORS(app) # Allows React to talk to Flask

# 3.3 API Endpoints

@app.route('/api/plans', methods=['GET'])
def get_plans():
    """Returns hardcoded loan plans for the UI."""
    plans = [
        {"id": 1, "name": "Elite Personal Loan", "rate": "9.5%", "tenure": "60 Months", "min_cibil": 750},
        {"id": 2, "name": "Standard Credit", "rate": "12.0%", "tenure": "36 Months", "min_cibil": 650},
        {"id": 3, "name": "Starter Loan", "rate": "15.0%", "tenure": "12 Months", "min_cibil": 600}
    ]
    return jsonify(plans)

@app.route('/api/analyze', methods=['POST'])
def analyze_loan():
    """Receives PDF, extracts data, and queries PGM."""
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files['file']
    
    try:
        # 1. Parse PDF
        extracted = extract_data_from_pdf(file)
        
        # 2. Query Bayesian Model
        # We multiply monthly income by 12 to match the 'income_annum' used in training
        prediction = get_loan_prediction(
            income=extracted['income'] * 12, 
            cibil=extracted['cibil'], 
            loan_amt=extracted['loan_amount']
        )
        
        return jsonify({
            "extracted_data": extracted,
            "ai_result": prediction,
            "status": "Success"
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)