import { useState } from "react";
import "../css/ImageCard.css";
import { useNavigate } from "react-router-dom";

function ImageCard({ name, image, pagePath, isUnderDevelopment }) {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    if (isUnderDevelopment) {
      setShowPopup(true);
    } else {
      navigate(pagePath);
    }
  };

  return (
    <>
      <div className={`image-card ${isUnderDevelopment ? "dev-card" : ""}`}>
        {isUnderDevelopment && (
          <div className="dev-banner">Under Development</div>
        )}

        <img src={image} alt={name} className="image-card-img" />

        <div className="image-card-name">{name}</div>

        <button 
          className={`card-button ${isUnderDevelopment ? "dev-button" : ""}`}
          onClick={handleClick}
        >
          {isUnderDevelopment ? "Unavailable" : "Select"}
        </button>
      </div>

      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-box">
            <h2>Under Development</h2>
            <p>This page is currently under development.</p>
            <button onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ImageCard;
