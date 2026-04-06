import pickle
import os
from pgmpy.inference import VariableElimination
from pgmpy.models import DiscreteBayesianNetwork 

# Get the directory where model_core.py is located
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Try to find the model in the 'models' subfolder OR the current folder
possible_paths = [
    os.path.join(BASE_DIR, 'models', 'bayesian_loan_model.pkl'),
    os.path.join(BASE_DIR, 'bayesian_loan_model.pkl')
]

MODEL_PATH = None
for p in possible_paths:
    if os.path.exists(p):
        MODEL_PATH = p
        break

def get_loan_prediction(income, cibil, loan_amt):
    try:
        if not MODEL_PATH:
            return {"error": "Model .pkl file not found in backend or backend/models folder."}

        with open(MODEL_PATH, 'rb') as f:
            model = pickle.load(f)
        
        # 1. Logic for Bins
        income_bin = 'Low' if income < 3000000 else 'Medium' if income < 6000000 else 'High'
        cibil_bin = 'Poor' if cibil <= 600 else 'Average' if cibil <= 750 else 'Excellent'
        loan_bin = 'Small' if loan_amt < 5000000 else 'Medium' if loan_amt < 15000000 else 'Large'

        # 2. Filter evidence
        full_evidence = {'cibil_bin': cibil_bin, 'income_bin': income_bin, 'loan_bin': loan_bin}
        active_evidence = {k: v for k, v in full_evidence.items() if k in model.nodes()}
        
        # 3. Inference
        infer = VariableElimination(model)
        result = infer.query(variables=['loan_status'], evidence=active_evidence)
        
        # Dynamic Index Mapping
        state_names = result.state_names['loan_status']
        # Some versions of pgmpy strip spaces, some don't. We check both.
        approved_label = 'Approved' if 'Approved' in state_names else ' Approved'
        
        approved_idx = state_names.index(approved_label)
        prob_approved = float(result.values[approved_idx])
        
        return {
            "probability": round(prob_approved * 100, 2), 
            "status": "Approved" if prob_approved > 0.5 else "Rejected",
            "bins_used": active_evidence
        }
    except Exception as e:
        print(f"AI ERROR: {str(e)}")
        return {"error": str(e)}