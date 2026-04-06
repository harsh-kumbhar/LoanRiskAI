import pickle
import os
from pgmpy.inference import VariableElimination
from pgmpy.models import DiscreteBayesianNetwork 

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# Ensure this matches your downloaded filename
MODEL_PATH = os.path.join(BASE_DIR, 'models', 'bayesian_loan_model_final.pkl')

def get_loan_prediction(raw_data):
    try:
        if not os.path.exists(MODEL_PATH):
            return {"error": "Model file not found in backend/models/"}

        with open(MODEL_PATH, 'rb') as f:
            model = pickle.load(f)
        
        # 1. Map raw data to the exact Bins used in Kaggle Training
        evidence = {
            'cibil_bin': 'Poor' if raw_data['cibil'] <= 600 else 'Average' if raw_data['cibil'] <= 750 else 'Excellent',
            'income_bin': 'Low' if raw_data['income'] < 3000000 else 'Medium' if raw_data['income'] < 6000000 else 'High',
            'loan_bin': 'Small' if raw_data['loan_amt'] < 5000000 else 'Medium' if raw_data['loan_amt'] < 15000000 else 'Large',
            'term_bin': 'Short' if raw_data['term'] <= 7 else 'Medium' if raw_data['term'] <= 15 else 'Long',
            'dep_bin': 'SmallFam' if raw_data['dependents'] <= 2 else 'LargeFam',
            'education': raw_data['education'], # Expecting 'Graduate' or 'Not Graduate'
            'self_employed': raw_data['self_employed'] # Expecting 'Yes' or 'No'
        }

        # 2. Run Inference
        infer = VariableElimination(model)
        # Filters evidence to only include nodes actually present in the DAG
        active_evidence = {k: v for k, v in evidence.items() if k in model.nodes()}
        
        result = infer.query(variables=['loan_status'], evidence=active_evidence)
        state_names = result.state_names['loan_status']
        
        # Handle potential leading spaces from the CSV labels
        approved_label = 'Approved' if 'Approved' in state_names else ' Approved'
        prob_approved = float(result.values[state_names.index(approved_label)])
        
        return {
            "probability": round(prob_approved * 100, 2),
            "status": "Approved" if prob_approved > 0.5 else "Rejected",
            "reasoning": active_evidence
        }
    except Exception as e:
        return {"error": str(e)}