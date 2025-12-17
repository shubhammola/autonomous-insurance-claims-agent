/**
 * index.js
 * --------
 * Main entry point for the Autonomous Claims Processing Agent.
 */

import fs from "fs";
import { extractText } from "./extractText.js";
import { extractFields } from "./extractFields.js";
import { findMissingFields } from "./validate.js";
import { routeClaim } from "./route.js";

// FNOL input file
/**
 * INPUT_FILE
 * ----------
 * Change this file path to test different FNOL scenarios.
 * Examples:
 *  - ./data/fnol.txt           → Complete low-damage claim (Fast-track)
 *  - ./data/fnol_missing.txt   → Missing mandatory fields (Manual Review)
 *  - ./data/fnol_injury.txt    → Injury-related claim (Specialist Queue)
 *  - ./data/fnol_fraud.txt     → Suspicious claim (Investigation Flag)
 */
const INPUT_FILE = "./data/fnol.txt";

// Step 1: Extract raw text
const rawText = extractText(INPUT_FILE);

// Step 2: Extract structured fields
const extractedFields = extractFields(rawText);

// Step 3: Validate mandatory fields
const missingFields = findMissingFields(extractedFields);

// Step 4: Apply routing rules
const routingResult = routeClaim(extractedFields, missingFields);

// Step 5: Final output (as per assessment format)
const finalResult = {
  extractedFields,
  missingFields,
  recommendedRoute: routingResult.recommendedRoute,
  reasoning: routingResult.reasoning
};

// Save output
fs.writeFileSync(
  "./output/result.json",
  JSON.stringify(finalResult, null, 2)
);

// Print to console
console.log("✅ Claim processed successfully:");
console.log(JSON.stringify(finalResult, null, 2));