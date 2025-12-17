# Autonomous Insurance Claims Processing Agent

## 📌 Overview
This project implements a **lightweight autonomous agent** to process FNOL (First Notice of Loss) insurance claims.  
The agent extracts key information from FNOL documents, validates mandatory fields, classifies claims, and routes them to the correct workflow based on predefined business rules.

The solution is intentionally designed to be **simple, explainable, and enterprise-friendly**, reflecting real-world insurance claim processing systems.

---

## 🎯 Key Capabilities
- Extracts required FNOL fields from text-based documents
- Detects missing or incomplete mandatory information
- Classifies claims using rule-based logic
- Routes claims to appropriate processing queues
- Produces structured JSON output for downstream systems

---

## 🛠️ Tech Stack
- **Node.js (JavaScript)**
- Regex-based text parsing
- JSON-based output
- Modular, rule-driven design

---

## 📂 Project Structure
```
autonomous-claims-agent/
│
├── data/                 # Sample FNOL input files
│   ├── fnol.txt
│   ├── fnol_missing.txt
│   ├── fnol_injury.txt
│   └── fnol_fraud.txt
│
├── src/                  # Core application logic
│   ├── extractText.js    # FNOL text extraction
│   ├── extractFields.js # Field parsing & normalization
│   ├── validate.js      # Mandatory field validation
│   ├── route.js         # Claim routing rules
│   └── index.js         # Application entry point
│
├── output/               # Generated output
│   └── result.json
│
├── package.json
├── package-lock.json
└── README.md
```

## 🔍 Extracted FNOL Fields

### Policy Information
- **Policy Number**
- **Policyholder Name**
- **Effective Dates** (if available)

### Incident Information
- **Date of Loss**
- **Time of Loss**
- **Location of Loss**
- **Description of Accident**

### Involved Parties
- **Claimant**
- **Third Parties**
- **Contact Details**

### Asset Details
- **Asset Type**
- **Asset ID (VIN)**
- **Estimated Damage**

### Other Mandatory Fields
- **Claim Type**
- **Attachments**
- **Initial Estimate**

---

## 🧠 Claim Routing Rules

- **Fast-track**
  - Condition: Estimated damage **less than 25,000**

- **Manual Review**
  - Condition: Any mandatory field is missing

- **Investigation Flag**
  - Condition: Accident description contains keywords such as  
    `fraud`, `staged`, `inconsistent`

- **Specialist Queue**
  - Condition: Claim type is **injury**

---

## ▶️ How to Run the Project

### Step 1: Install Dependencies
```
npm install
```

### Step 2: Run the Claims Processing Agent
```
node src/index.js
```
**Running the above command will:**
- Read the FNOL input file
- Extract required fields
- Validate mandatory information
- Apply routing rules
- Generate a structured JSON output

## 🧪 Testing Different FNOL Scenarios

This project includes multiple sample FNOL files to demonstrate how different claim scenarios are processed by the agent.

To test a scenario, update the `INPUT_FILE` variable in `src/index.js`:

```
/**
 * Change the file path below to test different FNOL scenarios:
 *
 * ./data/fnol.txt
 *   → Complete low-damage claim (Fast-track)
 *
 * ./data/fnol_missing.txt
 *   → Missing mandatory fields (Manual Review)
 *
 * ./data/fnol_injury.txt
 *   → Injury-related claim (Specialist Queue)
 *
 * ./data/fnol_fraud.txt
 *   → Suspicious claim (Investigation Flag)
const INPUT_FILE = "./data/fnol.txt";
```

After changing the file path, rerun the agent using:
```
node src/index.js
```

## 📤 Output Format

The claims processing agent generates a structured JSON output in the format shown below:

```json
{
  "extractedFields": {},
  "missingFields": [],
  "recommendedRoute": "",
  "reasoning": ""
}
```
The output is automatically written to the following file:
```
output/result.json
```
## 📸 Sample Output

### Console Output and Generated JSON Output
<img width="1440" height="900" alt="Screenshot 2025-12-17 at 10 51 55" src="https://github.com/user-attachments/assets/ab0f3403-2cc1-4a8c-8cfb-2e6cac6afd94" />


## 🚀 Future Enhancements

- Add support for PDF FNOL documents and scanned forms using OCR
- Integrate AI / LLM-based extraction for highly unstructured FNOL inputs
- Introduce confidence scoring for extracted fields
- Expose the claims agent via REST APIs for enterprise system integration
- Add configurable routing rules for different insurers or regions

## 🏁 Summary

This project demonstrates a **rule-based and explainable approach** to automating FNOL insurance claim processing.  
The solution focuses on accuracy, transparency, and maintainability, making it suitable for real-world insurance workflows and enterprise environments.
