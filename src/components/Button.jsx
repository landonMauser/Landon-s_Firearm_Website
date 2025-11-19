import React from "react";

export default function Button({ text, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        padding: "10px 20px",
        backgroundColor: "#4A90E2",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "1rem",
      }}
    >
      {text}
    </button>
  );
}
