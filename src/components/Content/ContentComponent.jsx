import React from "react";
import "./Content.css";

const ContentComponent = ({ selectedItem }) => {
  return (
    <main className="app-content">
      {selectedItem ? (
        <div className="content-details">
          <h2>{selectedItem.title}</h2>
          {selectedItem.details.map((detail, index) => (
            <div key={index} className="content-subsection">
              <h3>Subsection {index + 1}</h3>
              <p>{detail}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="content-placeholder">
          Select an item from the sidebar to view details
        </div>
      )}
    </main>
  );
};

export default ContentComponent;
