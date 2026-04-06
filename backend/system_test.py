import requests
import time

BASE_URL = "http://127.0.0.1:5000/api"
PDF_PATH = "test_doc.pdf"

def run_test():
    print("🚀 STARTING SYSTEM TEST\n")

    # 1. Extraction
    print("[1/4] Extracting PDF...")
    with open(PDF_PATH, 'rb') as f:
        res = requests.post(f"{BASE_URL}/analyze_pdf", files={'file': f})
        extracted = res.json()
    print(f"✅ Extracted: Income {extracted['income']}, CIBIL {extracted['cibil']}")

    time.sleep(1)

    # 2. Submit with Edits
    print("\n[2/4] Submitting with inflated salary...")
    submission = {
        **extracted,
        "name": "Harsh Kumbhar",
        "income": 9000000, 
        "original_extracted": extracted 
    }
    res = requests.post(f"{BASE_URL}/submit_application", json=submission)
    result = res.json()
    print(f"✅ AI Decision: {result['result']['status']} ({result['result']['probability']}%)")

    # 3. Admin Check
    print("\n[3/4] Checking Admin Dashboard...")
    requests.post(f"{BASE_URL}/admin/login", json={"password": "admin123"})
    res = requests.get(f"{BASE_URL}/admin/applications")
    last_app = res.json()[-1]
    print(f"✅ Integrity Flag: {last_app['integrity_flag']}")
    print(f"✅ Edited Fields: {last_app['edited_fields']}")

if __name__ == "__main__":
    run_test()