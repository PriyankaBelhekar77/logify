import React from "react";
import "./Sidebar.css";

const Sidebar = ({ items, selectedItem, onItemSelect }) => {
  return (
    <aside className="app-sidebar">
      {items.map((item) => {
        const timestampMatch = item.log.match(/^ERROR - \d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2},\d{3}/);
        const truncatedLog = timestampMatch ? timestampMatch[0] : ''; // Truncate at timestamp, otherwise show empty
        return <>
        <div
          key={item.id}
          className={`sidebar-item ${
            selectedItem?.id === item.id ? "active" : ""
          }`}
          onClick={() => onItemSelect(item)}
        >
          {truncatedLog}
        </div>
        </>
      })
    }
    </aside>
  );
};

export default Sidebar;
