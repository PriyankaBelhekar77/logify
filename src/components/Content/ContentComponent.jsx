import React from "react";
import "./Content.css";

const ContentComponent = ({ selectedItem }) => {
  return (
    <main className="app-content">
      {selectedItem ? (
        <div className="content-details">
          <h5>{selectedItem.log}</h5>
          {Object.keys(selectedItem.analysis).map((detail, index) => {
            return (
            <div key={index} className="content-subsection">
              <h3>{detail}</h3>
              <p>{selectedItem.analysis[detail]}</p>
            </div>
          )
          })}
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
