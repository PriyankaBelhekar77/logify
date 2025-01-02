import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import ContentComponent from "./components/Content";
import Sidebar from "./components/Sidebar";
import SearchBox from "./components/Search";

const App = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchResult, setSearchResult] = useState(null);

  const sidebarItems = [
    {
      id: "A",
      title: "This is demo",
      details: [
        "Subsection 1 for A",
        "Subsection 2 for A",
        "Subsection 3 for A",
      ],
    },
    {
      id: "B",
      title: "Find my details",
      details: [
        "Subsection 1 for B",
        "Subsection 2 for B",
        "Subsection 3 for B",
      ],
    },
  ];

  const handleSearch = (query) => {
    // Mock search result
    const result = sidebarItems.find((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResult(result);
    setSelectedItem(result);
  };

  const handleSidebar = (result) => {
    setSearchResult(result);
    setSelectedItem(result);
  }

  return (
    <div className="app">
      <Header title="Logify" />
      <div className="app-body">
        <Sidebar
          items={sidebarItems}
          selectedItem={selectedItem}
          onItemSelect={handleSidebar}
        />
        <div className="content-wrapper">
          {searchResult ? (
            <ContentComponent selectedItem={searchResult} />
          ) : (
            <SearchBox onSearch={handleSearch} />
          )}
          {searchResult ? <SearchBox onSearch={handleSearch} /> : null}
        </div>
      </div>
    </div>
  );
};

export default App;
