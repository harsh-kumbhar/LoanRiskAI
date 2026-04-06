import requests
import json

URL = "http://127.0.0.1:5000/api/analyze"
FILE_PATH = "test_doc.pdf"

def run_system_test():
    try:
        print(f"🚀 Initializing System Test with {FILE_PATH}...")
        
        with open(FILE_PATH, 'rb') as f:
            files = {'file': f}
            response = requests.post(URL, files=files)
            
            if response.status_code == 200:
                data = response.json()
                
                print("\n" + "="*40)
                print("       AI RISK ASSESSMENT REPORT       ")
                print("="*40)
                
                # 1. Show what the Regex found
                print("\n[STEP 1: DATA EXTRACTION]")
                ext = data['extracted_data']
                print(f"• Income found:  ₹{ext['income']}")
                print(f"• CIBIL found:  {ext['cibil']}")
                print(f"• Loan Amt:     ₹{ext['loan_amount']}")
                print(f"• Term:         {ext['term']} months")
                print(f"• Education:    {ext['education']}")

                # 2. Show the AI Decision
                print("\n[STEP 2: BAYESIAN INFERENCE]")
                ai = data['ai_result']
                status_color = "✅" if ai['status'] == "Approved" else "❌"
                print(f"• Final Decision: {status_color} {ai['status']}")
                print(f"• AI Confidence:  {ai['probability']}%")
                
                # 3. Show the "Why" (Reasoning)
                print("\n[STEP 3: PROBABILISTIC REASONING]")
                print("Evidence Bins used by PGM:")
                print(json.dumps(ai['reasoning'], indent=4))
                
                print("\n" + "="*40)
            else:
                print(f"❌ Server Error {response.status_code}: {response.text}")

    except FileNotFoundError:
        print(f"Error: {FILE_PATH} not found. Create the PDF first!")
    except Exception as e:
        print(f"Connection Error: {e}")

if __name__ == "__main__":
    run_system_test()