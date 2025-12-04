import { useState } from "react";

const Favorites = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

const BACKEND_URL = "http://localhost:8888/reactapp/favorites.php";

const handleSubmit = async (e) => {
  e.preventDefault();
  const trimmedMessage = message.trim();
  if (!trimmedMessage) {
    setStatus("Message cannot be empty");
    return;
  }

  setLoading(true);
  setStatus("");

  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: trimmedMessage }),
    });

    const data = await response.json();
    if (data.success) {
      setStatus("Saved successfully!");
      setMessage("");
    } else {
      setStatus("Error saving: " + data.error);
    }
  } catch (err) {
    setStatus("Network error: " + err.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h2>Send a Message</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: "100%", height: "150px", marginBottom: "10px" }}
        />
        <button type="submit" disabled={loading} style={{ padding: "10px 20px" }}>
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
      {status && (
        <p style={{ color: status.includes("success") ? "green" : "red" }}>{status}</p>
      )}
    </div>
  );
};

export default Favorites;
