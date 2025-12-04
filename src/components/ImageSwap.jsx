import { useState } from "react";
import "../css/M1_Carbine.css";

export default function ImageSwap({ models }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = models[currentIndex];

  return (
    <div className="side-image-row">
      
      {/* BUTTON COLUMN */}
      <div className="side-buttons-column">
        {models.map((m, index) => (
          <button
            key={index}
            className="side-image-button"
            onClick={() => setCurrentIndex(index)}
            style={{
              backgroundColor:
                index === currentIndex ? "#6BB8FF" : "#97CDFC",
            }}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* VERTICAL IMAGE COLUMN */}
      <div className="side-image-column">
        {current.images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={current.label}
            className="side-image"
          />
        ))}
      </div>

    </div>
  );
}
