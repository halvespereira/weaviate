import React from "react";
import Result from "./components/Result";

const results = (data) => {
  const results = data.map((d, idx) => <Result data={d} key={idx} />);

  return results;
};

const noResultsFound = () => {
  return <h4 className="__noResultsFound">Sorry, no results were found.</h4>;
};

const displayResults = (data) => {
  if (data.length) {
    return results(data);
  } else {
    return noResultsFound();
  }
};

export const displayMessages = (isError, screenMessage) => {
  return (
    <h3 className={isError ? "__isError" : "__welcomeMessage"}>
      {screenMessage}
    </h3>
  );
};

export default displayResults;
