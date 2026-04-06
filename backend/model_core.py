import pickle
import os
from pgmpy.inference import VariableElimination

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'models', 'bayesian_loan_model_final.pkl')

def get_loan_prediction(data):
    try:
        with open(MODEL_PATH, 'rb') as f:
            model = pickle.load(f)
        
        # 1. Bining Logic
        evidence = {
            'cibil_bin': 'Poor' if data['cibil'] <= 600 else 'Average' if data['cibil'] <= 750 else 'Excellent',
            'income_bin': 'Low' if data['income'] < 3000000 else 'Medium' if data['income'] < 6000000 else 'High',
            'loan_bin': 'Small' if data['loan_amt'] < 5000000 else 'Medium' if data['loan_amt'] < 15000000 else 'Large',
            'term_bin': 'Short' if data['term'] <= 7 else 'Medium' if data['term'] <= 15 else 'Long',
            'dep_bin': 'SmallFam' if data['dependents'] <= 2 else 'LargeFam',
            'education': data['education'],
            'self_employed': data['self_employed']
        }

        # 2. Inference
        infer = VariableElimination(model)
        active_evidence = {k: v for k, v in evidence.items() if k in model.nodes()}
        result = infer.query(variables=['loan_status'], evidence=active_evidence)
        
        state_names = result.state_names['loan_status']
        approved_label = 'Approved' if 'Approved' in state_names else ' Approved'
        prob = float(result.values[state_names.index(approved_label)])
        
        # 3. Dynamic Interest Rate Feature
        # Prime customers (High Prob) get the best rates
        if prob > 0.90:
            rate = 8.75
        elif prob > 0.70:
            rate = 10.5
        else:
            rate = 13.2

        return {
            "probability": round(prob * 100, 2),
            "status": "Approved" if prob > 0.5 else "Rejected",
            "suggested_rate": f"{rate}%",
            "evidence_used": active_evidence
        }
    except Exception as e:
        return {"error": str(e)}