import React from "react";
import "./Sidebar.css";

const Sidebar = ({ items, selectedItem, onItemSelect }) => {
  return (
    <aside className="app-sidebar">
      {items.map((item) => (
        <div
          key={item.id}
          className={`sidebar-item ${
            selectedItem?.id === item.id ? "active" : ""
          }`}
          onClick={() => onItemSelect(item)}
        >
          {item.title}
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
