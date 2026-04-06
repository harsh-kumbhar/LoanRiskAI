import requests

URL = "http://127.0.0.1:5000/api/analyze"
FILE_PATH = "test_doc.pdf"

def test_backend():
    try:
        with open(FILE_PATH, 'rb') as f:
            files = {'file': f}
            response = requests.post(URL, files=files)
            data = response.json()
            
            if response.status_code == 200:
                if "error" in data.get("ai_result", {}):
                    print(f"❌ AI Model Error: {data['ai_result']['error']}")
                else:
                    print("\n✅ ANALYSIS COMPLETE")
                    print(f"Income: {data['extracted_data']['income']}")
                    print(f"CIBIL: {data['extracted_data']['cibil']}")
                    print(f"Decision: {data['ai_result']['status']}")
                    print(f"Confidence: {data['ai_result']['probability']}%")
            else:
                print(f"❌ Server Error: {data.get('error', 'Unknown')}")
                
    except Exception as e:
        print(f"Script Error: {e}")

if __name__ == "__main__":
    test_backend()