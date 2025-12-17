/**
 * route.js
 * --------
 * Applies business routing rules to FNOL claims.
 */

export function routeClaim(extractedFields, missingFields) {
  const description = (extractedFields.incidentDescription || "").toLowerCase();

  // Rule 1: Missing mandatory fields
  if (missingFields.length > 0) {
    return {
      recommendedRoute: "Manual Review",
      reasoning: "Mandatory FNOL fields are missing and require human verification"
    };
  }

  // Rule 2: Fraud / investigation keywords
  const suspiciousWords = ["fraud", "staged", "inconsistent"];
  if (suspiciousWords.some(word => description.includes(word))) {
    return {
      recommendedRoute: "Investigation Flag",
      reasoning: "Suspicious keywords detected in accident description"
    };
  }

  // Rule 3: Injury claims
  if (extractedFields.claimType === "injury") {
    return {
      recommendedRoute: "Specialist Queue",
      reasoning: "Injury-related claim requires specialist handling"
    };
  }

  // Rule 4: Fast-track low damage claims
  if (extractedFields.estimatedDamage < 25000) {
    return {
      recommendedRoute: "Fast-track",
      reasoning: "Estimated damage below threshold for fast processing"
    };
  }

  // Default routing
  return {
    recommendedRoute: "Standard Processing",
    reasoning: "Claim meets standard processing criteria"
  };
}