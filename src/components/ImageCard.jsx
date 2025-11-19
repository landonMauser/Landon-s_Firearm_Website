import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/ImageCard.css";

function ImageCard({ name, image, pagePath }) {
  const navigate = useNavigate();

  const goToPage = () => {
    navigate(pagePath);
  };

  return (
    <div className="image-card">
      <div className="image-container">
        <img src={image} alt={name} className="image-card-img" />
      </div>
      <h3 className="image-card-name">{name}</h3>
      <button className="image-card-button" onClick={goToPage}>
        Date {name}
      </button>
    </div>
  );
}

export default ImageCard;