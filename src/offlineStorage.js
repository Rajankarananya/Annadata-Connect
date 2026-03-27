// Storage key for the latest crop damage analysis result.
const ANALYSIS_STORAGE_KEY = "annadata:lastAnalysisResult";

// Saves the latest successful analysis output along with when it was stored.
export function saveAnalysisResult(result) {
  const payload = {
    timestamp: new Date().toISOString(),
    result
  };

  localStorage.setItem(ANALYSIS_STORAGE_KEY, JSON.stringify(payload));
}

// Retrieves the last saved analysis result payload; returns null when missing or invalid.
export function getLastAnalysisResult() {
  const raw = localStorage.getItem(ANALYSIS_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    // If data is corrupted, clear it so future reads behave safely.
    localStorage.removeItem(ANALYSIS_STORAGE_KEY);
    return null;
  }
}
