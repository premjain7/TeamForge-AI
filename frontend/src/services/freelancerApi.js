async function parseJsonSafely(response) {
  const text = await response.text();
  if (!text) {
    throw new Error(
      response.ok
        ? "The server returned an empty response. Please try again."
        : `Request failed (${response.status}). Please try again.`
    );
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new Error("The server returned an unexpected response. Please try again.");
  }
}

export async function registerFreelancer(formData) {
  const response = await fetch("/api/freelancer/register", {
    method: "POST",
    body: formData,
  });

  const data = await parseJsonSafely(response);
  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to register freelancer");
  }
  return data;
}

export async function summarizeFreelancer(payload) {
  const response = await fetch("/api/freelancer/summarize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await parseJsonSafely(response);
  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to summarize freelancer");
  }
  return data;
}