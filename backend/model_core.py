import pickle
import os
from pgmpy.inference import VariableElimination

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'models', 'bayesian_loan_model_final.pkl')

def get_loan_prediction(data):
    try:
        with open(MODEL_PATH, 'rb') as f:
            model = pickle.load(f)
        
        # Robust data fetching to prevent crashes
        income = float(data.get('income', 0))
        cibil = int(data.get('cibil', 0))
        # Handle both variations of the key
        loan_amt = float(data.get('loan_amount', data.get('loan_amt', 0)))
        term = int(data.get('term', 12))
        deps = int(data.get('dependents', 0))

        evidence = {
            'cibil_bin': 'Poor' if cibil <= 600 else 'Average' if cibil <= 750 else 'Excellent',
            'income_bin': 'Low' if income < 3000000 else 'Medium' if income < 6000000 else 'High',
            'loan_bin': 'Small' if loan_amt < 5000000 else 'Medium' if loan_amt < 15000000 else 'Large',
            'term_bin': 'Short' if term <= 7 else 'Medium' if term <= 15 else 'Long',
            'dep_bin': 'SmallFam' if deps <= 2 else 'LargeFam',
            'education': data.get('education', 'Graduate'),
            'self_employed': data.get('self_employed', 'No')
        }

        infer = VariableElimination(model)
        active_evidence = {k: v for k, v in evidence.items() if k in model.nodes()}
        result = infer.query(variables=['loan_status'], evidence=active_evidence)
        
        state_names = result.state_names['loan_status']
        approved_label = 'Approved' if 'Approved' in state_names else ' Approved'
        prob = float(result.values[state_names.index(approved_label)])
        
        # Dynamic Rates
        rate = 8.75 if prob > 0.90 else 10.5 if prob > 0.70 else 13.2

        return {
            "probability": round(prob * 100, 2),
            "status": "Approved" if prob > 0.5 else "Rejected",
            "suggested_rate": f"{rate}%",
            "evidence_used": active_evidence
        }
    except Exception as e:
        print(f"MODEL ERROR: {e}")
        return {"error": str(e)}