import React from "react";
import "../css/Credits.css";

function Credits({ creditList }) {
  if (!creditList || creditList.length === 0) return null; 

  return (
    <div className="credits-container">
      <h3>Credits & References</h3>
      <ul className="credits-list">
        {creditList.map((credit, index) => (
          <li key={index}>
            <a href={credit.url} target="_blank" rel="noopener noreferrer">
              {credit.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Credits;
