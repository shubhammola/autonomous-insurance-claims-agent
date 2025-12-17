/**
 * extractText.js
 * ----------------
 * Responsible for extracting raw text from FNOL documents.
 * Currently supports TXT files.
 * Designed to be easily extended for PDFs later.
 */

import fs from "fs";
import path from "path";

/**
 * Extract text from a given file path
 * @param {string} filePath - Path to FNOL file
 * @returns {string} extracted text
 */
export function extractText(filePath) {
  const extension = path.extname(filePath).toLowerCase();

  if (extension === ".txt") {
    return fs.readFileSync(filePath, "utf-8");
  }

  throw new Error("Unsupported file format. Only TXT supported currently.");
}