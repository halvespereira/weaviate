import React from "react";

import "../App.css";
// Other components
import Header from "./Header";
import UserInput from "./UserInput";
import ScreenDisplay from "./ScreenDisplay";
const Home = ({
  searchFunction,
  word,
  setWord,
  publication,
  setPublication,
  limit,
  setLimit,
  minWordCount,
  setMinWordCount,
  isSearching,
  data,
  isError,
  screenMessage,
}) => {
  return (
    <div className="__App">
      {/* Header of the app */}
      <header>
        <Header />
      </header>

      {/* Main section of the app */}
      <main>
        <div className="__Body">
          {/* Form to collect values from user and query data from weaviate*/}
          <UserInput
            searchFunction={searchFunction}
            word={word}
            setWord={setWord}
            publication={publication}
            setPublication={setPublication}
            limit={limit}
            setLimit={setLimit}
            minWordCount={minWordCount}
            setMinWordCount={setMinWordCount}
            isSearching={isSearching}
          />
          {/* Screen display - changes depending on state */}
          <ScreenDisplay
            data={data}
            isError={isError}
            screenMessage={screenMessage}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
