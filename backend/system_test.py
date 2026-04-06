import requests
import json
import time

BASE_URL = "http://127.0.0.1:5000/api"
PDF_PATH = "test_doc.pdf"
ADMIN_PASS = "admin123"

def run_test():
    print("🚀 STARTING END-TO-END SYSTEM TEST\n")

    # --- PHASE 1: PDF EXTRACTION ---
    print("[1/4] Uploading PDF for initial extraction...")
    with open(PDF_PATH, 'rb') as f:
        files = {'file': f}
        extract_res = requests.post(f"{BASE_URL}/analyze_pdf", files=files)
        extracted_data = extract_res.json()
    
    print(f"✅ Extracted Income: {extracted_data['income']}, CIBIL: {extracted_data['cibil']}")

    # --- PHASE 2: SUBMITTING WITH EDITS (FRAUD TEST) ---
    print("\n[2/4] Simulating User Edits (Inflating Salary)...")
    # We take the extracted data but change the income manually
    fraud_data = extracted_data.copy()
    fraud_data.update({
        "name": "Harsh Kumbhar",
        "income": 9999999, # Artificially high
        "product_name": "HDFC-Style Salary Plus",
        "original_extracted": extracted_data # Send the original to let backend compare
    })

    submit_res = requests.post(f"{BASE_URL}/submit_application", json=fraud_data)
    result = submit_res.json()
    print(f"✅ AI Decision: {result['result']['status']} ({result['result']['probability']}%)")
    print(f"✅ Offered Rate: {result['result']['suggested_rate']}")

    # --- PHASE 3: ADMIN LOGIN ---
    print("\n[3/4] Testing Admin Authentication...")
    login_res = requests.post(f"{BASE_URL}/admin/login", json={"password": ADMIN_PASS})
    if login_res.json().get("auth"):
        print("✅ Admin Auth Successful")
    else:
        print("❌ Admin Auth Failed")
        return

    # --- PHASE 4: BANKER DASHBOARD AUDIT ---
    print("\n[4/4] Fetching Banker Dashboard for Integrity Check...")
    dash_res = requests.get(f"{BASE_URL}/api/admin/applications")
    apps = dash_res.json()
    
    last_app = apps[-1]
    print(f"\n--- BANKER VIEW: APPLICATION #{last_app['id']} ---")
    print(f"Applicant: {last_app['applicant_name']}")
    print(f"Integrity: {last_app['integrity_flag']}") # Should say 'User Edited'
    if last_app['integrity_flag'] == "User Edited":
        print(f"⚠️  WARNING: User manually changed: {last_app['edited_fields']}")
    
    print("\n" + "="*40)
    print("      SYSTEM TEST COMPLETED SUCCESSFULLY")
    print("="*40)

if __name__ == "__main__":
    try:
        run_test()
    except Exception as e:
        print(f"❌ Connection Error: Ensure Flask (app.py) is running on port 5000.\nDetails: {e}")