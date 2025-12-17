/**
 * validate.js
 * -----------
 * Validates extracted FNOL data and identifies missing mandatory fields.
 */

const MANDATORY_FIELDS = [
  "policyNumber",
  "incidentDate",
  "incidentDescription",
  "claimType",
  "estimatedDamage"
];

/**
 * Find missing mandatory fields
 */
export function findMissingFields(extractedFields) {
  return MANDATORY_FIELDS.filter(
    (field) => !extractedFields[field]
  );
}