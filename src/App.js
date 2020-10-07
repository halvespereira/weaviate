import React, { useState, useEffect } from "react";
import "./App.css";

// Other components
import Header from "./components/Header";
import UserInput from "./components/UserInput";

// functions
import searchFunction from "./Search";
import displayResults, { displayMessages } from "./screenmessages";

function App() {
  // State
  const [word, setWord] = useState("");
  const [publication, setPublication] = useState("");
  const [data, setData] = useState(null);
  const [count, setCount] = useState("");
  const [limit, setLimit] = useState("");
  const [isError, setError] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [screenMessage, setScreenMessage] = useState("Welcome");

  // Search function - where the magic happens
  const search = async (e) => {
    e.preventDefault();
    setIsSearching(true);

    try {
      const articles = await searchFunction(word, limit, publication, count);
      setData(articles);
      setIsSearching(false);
    } catch (err) {
      console.log(err);
      setError(true);
      setScreenMessage("Oops, something went wrong.");
      setIsSearching(false);
    }

    setWord("");
    setLimit("");
    setCount("");
    setPublication("");
  };

  // What displays on screen depending on state
  const displayScreen = () => {
    if (data) {
      return displayResults(data);
    } else {
      return displayMessages(isError, screenMessage);
    }
  };

  return (
    <div className="__App">
      {/* Header of the app */}
      <header>
        <Header />
      </header>

      {/* Main part */}
      <main>
        <div className="__Body">
          {/* Form to collect values from user and query data from weaviate*/}
          <UserInput
            searchFunction={search}
            word={word}
            setWord={setWord}
            publication={publication}
            setPublication={setPublication}
            limit={limit}
            setLimit={setLimit}
            count={count}
            setCount={setCount}
            isSearching={isSearching}
          />
          {/* main screen display - changes depending on state */}
          <div className="__ResultsDiv">{displayScreen()}</div>
        </div>
      </main>
    </div>
  );
}

export default App;
