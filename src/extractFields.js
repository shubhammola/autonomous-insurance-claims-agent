/**
 * extractFields.js
 * ----------------
 * Extracts required FNOL fields using regex and rule-based inference.
 * Keeps extraction logic isolated from validation and routing.
 */

/**
 * Helper function to safely extract regex matches
 */
function match(text, regex) {
  const result = text.match(regex);
  return result ? result[1].trim() : null;
}

/**
 * Convert amount string to number
 */
function parseAmount(value) {
  return value ? Number(value.replace(/,/g, "")) : null;
}

/**
 * Infer claim type from FNOL content
 */
function inferClaimType(text) {
  if (text.includes("INJURED") || text.includes("EXTENT OF INJURY")) {
    return "injury";
  }
  if (text.includes("INSURED VEHICLE")) {
    return "vehicle";
  }
  return null;
}

/**
 * Main extraction function
 */
export function extractFields(rawText) {
  const text = rawText.replace(/\s+/g, " "); // normalize spacing

  return {
    policyNumber: match(text, /POLICY NUMBER\s*([A-Z0-9-]+)/),
    policyholderName: match(text, /NAME OF INSURED\s*([A-Z\s]+)/),
    incidentDate: match(text, /DATE OF LOSS\s*(\d{2}\/\d{2}\/\d{4})/),
    incidentTime: match(text, /TIME\s*(\d{1,2}:\d{2}\s*(AM|PM))/),
    incidentLocation: match(
      text,
      /LOCATION OF LOSS\s*(.*?)\s*(POLICE|DESCRIPTION)/i
    ),
    incidentDescription: match(
      text,
      /DESCRIPTION OF ACCIDENT\s*(.*?)\s*(INSURED VEHICLE|$)/i
    ),
    claimant: match(text, /INSURED\s*NAME\s*([A-Z\s]+)/),
    contactDetails: match(text, /PHONE\s*#?\s*([\d-]+)/),
    assetType: text.includes("INSURED VEHICLE") ? "Vehicle" : null,
    assetId: match(text, /V\.I\.N\.:\s*([A-Z0-9]+)/),
    estimatedDamage: parseAmount(
      match(text, /ESTIMATE AMOUNT\s*\$?([\d,]+)/)
    ),
    claimType: inferClaimType(text),
    attachments: text.includes("ACORD 101") ? "ACORD 101" : null,
    initialEstimate: parseAmount(
      match(text, /ESTIMATE AMOUNT\s*\$?([\d,]+)/)
    )
  };
}