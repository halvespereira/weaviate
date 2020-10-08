import React from "react";

import "./UserOutput.css";

// Other components
import Result from "./Result";
import NoResultsFound from "./NoResultsFound";

const UserOutput = ({ data, isError, screenMessage }) => {
  // Function runs if there is an error or if there isn't any data in state
  const getErrorWelcomeMessage = (isError, screenMessage) => {
    return (
      <h3 className={isError ? "__isError" : "__welcomeMessage"}>
        {screenMessage}
      </h3>
    );
  };

  // Function runs where data is fetched from Weaviate
  const getResults = (data) => {
    if (data.length) {
      return (
        <div className="__ResultsDiv">
          {data.map((d, idx) => (
            <Result data={d} key={idx} />
          ))}
        </div>
      );
    } else {
      return <NoResultsFound />;
    }
  };

  return (
    <div className="__UserOutput">
      {data ? getResults(data) : getErrorWelcomeMessage(isError, screenMessage)}
    </div>
  );
};

export default UserOutput;
