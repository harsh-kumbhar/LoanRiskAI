## BayesLoanAI - Explainable Loan Risk Assessment

### **Project Overview**
**BayesLoanAI** is an "Enterprise-Grade" financial decision support system developed for the **S.E. Mini Project AY 2026-27** at **Vidyalankar Institute of Technology**. The system leverages **Probabilistic Graphical Models (PGM)** and **Bayesian Networks** to provide explainable AI-driven loan approvals. Unlike "black-box" machine learning models, this system provides transparent reasoning for every decision, combined with a "Human-in-the-Loop" banker dashboard for final authorization.

---

### **Core Features**
* **Intelligent PDF Extraction**: Uses advanced Regex patterns to parse unstructured data from salary slips and CIBIL reports.
* **Bayesian Inference Engine**: Utilizes a Discrete Bayesian Network to calculate joint probabilities of approval based on historical bank data.
* **Explainable AI (XAI)**: Displays the specific evidence and Conditional Probability Table (CPT) logic behind each verdict.
* **Financial Guardrails**: Implements a hybrid logic layer that enforces "Debt-to-Income" (DTI) sanity checks to prevent high-risk lending.
* **Banker Audit Console**: A secure administrative dashboard for reviewing applications, downloading audit reports, and detecting manual user edits (Integrity Flags).

---

### **System Architecture**
The project follows a decoupled client-server architecture:
1.  **Frontend**: Built with **React.js**, **Tailwind CSS**, and **Framer Motion** for a sleek, glassmorphic UI.
2.  **Backend**: A **Flask** REST API handling document parsing and model inference.
3.  **AI Layer**: Powered by the **pgmpy** library using **Variable Elimination** for inference.



---

### **Installation & Setup**

#### **1. Backend Setup**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install flask flask-cors pypdf pgmpy pickle5
python app.py
```

#### **2. Frontend Setup**
```bash
cd frontend
npm install
npm install lucide-react framer-motion axios
npm run dev
```

---

### **Project Files**
* `app.py`: The central API controller managing routes, integrity checks, and guardrails.
* `model_core.py`: The PGM inference module that bins raw data and queries the Bayesian model.
* `utils.py`: Text extraction utility using `pypdf` and regex to identify financial markers.
* `BankerDashboard.jsx`: The administrative interface for final loan authorization and audit.

---

### **Testing Scenarios**
The system is validated against several edge cases:
1.  **Elite Tier**: High income + High CIBIL $\rightarrow$ Guaranteed Approval.
2.  **DTI Trap**: High CIBIL + Low Income $\rightarrow$ Rejected by Financial Guardrail.
3.  **Integrity Audit**: Flagging applications where users manually inflate values post-scan.


