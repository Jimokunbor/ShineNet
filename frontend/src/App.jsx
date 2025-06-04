import { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setAiResponse("");

    try {
      const res = await fetch(`http://localhost:8000/api/ai/?prompt=${encodeURIComponent(prompt)}`);
      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setAiResponse(data.ai_response);
      }
    } catch (err) {
      setError("Network error: failed to reach the AI endpoint.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "50px auto" }}>
      <h1>Shine Net AI Chat</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "8px" }}>
          Enter prompt:
        </label>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{ width: "100%", padding: "8px", fontSize: "16px" }}
          required
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Loading..." : "Send to AI"}
        </button>
      </form>

      {error && (
        <div style={{ color: "red", marginBottom: "20px" }}>
          Error: {error}
        </div>
      )}

      {aiResponse && (
        <div style={{ whiteSpace: "pre-wrap", background: "#f5f5f5", padding: "15px", borderRadius: "5px" }}>
          {aiResponse}
        </div>
      )}
    </div>
  );
}

export default App;
