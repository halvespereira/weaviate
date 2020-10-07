import React, { useState } from "react";
import "./App.css";

// Other components
import Home from "./components/Home";

// functions
import getArticles from "./weaviate";

function App() {
  // State
  const [word, setWord] = useState("");
  const [publication, setPublication] = useState("");
  const [data, setData] = useState(null);
  const [minWordCount, setMinWordCount] = useState("");
  const [limit, setLimit] = useState("");
  const [isError, setError] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [screenMessage, setScreenMessage] = useState("Welcome");

  // Search function - where the magic happens
  const search = async (e) => {
    e.preventDefault();
    setIsSearching(true);

    if (word) {
      try {
        const articles = await getArticles(
          word,
          limit,
          publication,
          minWordCount
        );
        setData(articles);
        setIsSearching(false);
      } catch (err) {
        console.log(err);
        setError(true);
        setScreenMessage("Oops, something went wrong");
        setIsSearching(false);
      }
    } else {
      setData(null);
      setScreenMessage("Must enter Semantic keywords");
      setError(true);
      setIsSearching(false);
    }

    setWord("");
    setLimit("");
    setMinWordCount("");
    setPublication("");
  };

  return (
    <Home
      searchFunction={search}
      word={word}
      setWord={setWord}
      publication={publication}
      setPublication={setPublication}
      limit={limit}
      setLimit={setLimit}
      minWordCount={minWordCount}
      setMinWordCount={setMinWordCount}
      isSearching={isSearching}
      data={data}
      isError={isError}
      screenMessage={screenMessage}
    />
  );
}

export default App;
