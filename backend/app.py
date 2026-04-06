from flask import Flask, request, jsonify
from flask_cors import CORS
from utils import extract_data_from_pdf
from model_core import get_loan_prediction

app = Flask(__name__)
CORS(app)

@app.route('/api/plans', methods=['GET'])
def get_plans():
    return jsonify([
        {"id": 1, "name": "Premium Personal Loan", "rate": "9.2%", "tenure": "60m"},
        {"id": 2, "name": "Home Starter Credit", "rate": "11.5%", "tenure": "36m"},
        {"id": 3, "name": "Small Biz Loan", "rate": "14.0%", "tenure": "12m"}
    ])

@app.route('/api/analyze', methods=['POST'])
def analyze_loan():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files['file']
    
    try:
        # 1. Extract wide range of data from PDF
        extracted = extract_data_from_pdf(file)
        
        # 2. Prepare data for model (Annualize monthly salary if needed)
        # Note: If your PDF has monthly salary, multiply by 12
        input_data = {
            "income": extracted['income'] * 12 if extracted['income'] < 1000000 else extracted['income'],
            "cibil": extracted['cibil'],
            "loan_amt": extracted['loan_amount'],
            "term": extracted['term'],
            "dependents": extracted['dependents'],
            "education": extracted['education'],
            "self_employed": extracted['self_employed']
        }
        
        # 3. Get AI Prediction from the PGM
        prediction = get_loan_prediction(input_data)
        
        return jsonify({
            "extracted_data": extracted,
            "ai_result": prediction
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)