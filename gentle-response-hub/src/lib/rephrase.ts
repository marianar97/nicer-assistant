/**
 * Calls the backend AI API to rephrase the input text.
 */
export async function rephraseDirect(input: string): Promise<string> {
  if (!input.trim()) return "";

  try {
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", response.status, errorText);
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("!@# data", data);
    // Assuming the backend returns an object like { original: '...', transformed: '...' }
    return data.transformed || ""; // Return the transformed text or empty string
  } catch (error) {
    console.error("Failed to call rephrase API:", error);
    // Return original input or a specific error message on failure
    return `Error rephrasing: ${input}`;
  }
}
