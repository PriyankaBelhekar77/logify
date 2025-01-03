import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import ContentComponent from "./components/Content";
import Sidebar from "./components/Sidebar";
import SearchBox from "./components/Search";
import axios from "axios"; // Import axios for API requests

const App = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);  // Manage loading state
  const [pollingData, setPollingData] = useState(null);  // Store the fetched data

  const sidebarItems = [
    {
      id: "A",
      log: "ERROR - 2024-09-26 07:43:22,573 - Request Id: 5755bec0-48b7-4667-8935-aed03f62bae8 Error in execution of function...",
      analysis: {
        error: "Missing arguments in initialization of UtkarshOperations class",
        fix: "Make sure to provide all the required arguments...",
        codeExample: "obj = UtkarshOperations(dbConn=value1, payload=value2, requestId=value3, consumerId=value4)"
      }
    },
    // Add other items
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8081/poll_logs"); // Replace with your API URL
      setPollingData(response.data); // Store the fetched data
      setIsLoading(false);  // Stop the loader once data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false); // Stop loader on error
    }
  };

  // Start polling API after initial render
  useEffect(() => {
    // Polling interval (every 30 seconds for example)
    const interval = setInterval(() => {
      fetchData();
    }, 30000); // Fetch data every 30 seconds

    // Stop polling after 2 minutes
    setTimeout(() => {
      clearInterval(interval); // Stop polling after 2 minutes (120,000 ms)
    }, 120000); // 2 minutes

    // Initial fetch when the component mounts
    fetchData();

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const handleSearch = (query) => {
    const result = sidebarItems.find((item) =>
      item.log.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResult(result);
    setSelectedItem(result);
  };

  const handleSidebar = (result) => {
    setSearchResult(result);
    setSelectedItem(result);
  };

  const handleStartAnalysis = () => {
    fetchData();
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
          {isLoading ? (
            <div className="loader">Loading...</div>  // Show loader during fetching
          ) : searchResult ? (
            <ContentComponent selectedItem={searchResult} />
          ) : (
            <SearchBox onSearch={handleSearch} />
          )}
          {searchResult ? <SearchBox onSearch={handleSearch} /> : null}
          <hr />
          <button type="submit" className="search-button" onClick={() => handleStartAnalysis}>
            Start Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
