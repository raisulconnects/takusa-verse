export function getBaseUrl() {
  if (typeof window !== "undefined") {
    // Browser environment -> relative URLs are fine
    return "";
  }
  // Server-side
  if (process.env.VERCEL_URL) {
    // Production on Vercel
    return `https://${process.env.VERCEL_URL}`;
  }
  // Local development
  return `http://localhost:${process.env.PORT || 3000}`;
}
