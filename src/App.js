import React, { useState } from "react";
import "./App.css";

// weaviate package
import weaviate from "weaviate-client";

// Other components
import Result from "./components/Result";
import Header from "./components/Header";
import UserInput from "./components/UserInput";

// Generate unique id
import nextId from "react-id-generator";

function App() {
  // State and refs to store user input
  const [word, setWord] = useState("");
  const [publication, setPublication] = useState("");
  const [data, setData] = useState(null);
  const [count, setCount] = useState("");
  const [limit, setLimit] = useState("");

  // weaviate setup
  const client = weaviate.client({
    scheme: "https",
    host: "demo.dataset.playground.semi.technology/",
  });

  // Search function - where the magic happens
  const search = (e, spinner, searchButton) => {
    e.preventDefault();

    if (word && !publication) {
      e.target.textContent = "Searching...";
      spinner.current.style.animation = "spin 0.5s linear infinite";

      setTimeout(async () => {
        await client.graphql
          .get()
          .withClassName("Article")
          .withFields(
            "title url wordCount InPublication {... on Publication {name}} _nearestNeighbors{ neighbors {concept}}"
          )
          .withExplore({
            concepts: [word],
            certainty: 0.7,
          })
          .withWhere({
            path: ["wordCount"],
            operator: "GreaterThan",
            valueInt: Number(count),
          })
          .withLimit(Number(limit))
          .do()
          .then((res) => {
            setData(res.data.Get.Things.Article);
            spinner.current.style.animation = "spin 4s linear infinite";
          })
          .catch((err) => {
            console.error(err);
          });
        searchButton.current.textContent = "Search";
      }, 500);
    }

    if (word && publication) {
      e.target.textContent = "Searching...";
      spinner.current.style.animation = "spin 0.5s 3.0s linear infinite";
      setTimeout(async () => {
        await client.graphql
          .get()
          .withClassName("Article")
          .withFields(
            "title url wordCount InPublication {... on Publication {name}}  _nearestNeighbors{ neighbors {concept}}"
          )
          .withExplore({
            concepts: [word],
            certainty: 0.7,
          })
          .withWhere({
            operator: "And",
            operands: [
              {
                operator: "Equal",
                path: ["inPublication", "Publication", "name"],
                valueText: `${publication}`,
              },
              {
                path: ["wordCount"],
                operator: "GreaterThan",
                valueInt: Number(count),
              },
            ],
          })
          .withLimit(Number(limit))
          .do()
          .then((res) => {
            setData(res.data.Get.Things.Article);
            spinner.current.style.animation = "spin 4s linear infinite";
          })
          .catch((err) => {
            console.error(err);
          });
        searchButton.current.textContent = "Search";
      }, 500);
    }
    setWord("");
    setLimit("");
    setCount("");
    setPublication("");
  };

  // Handling state in child component
  function handleState(value, handler) {
    handler(value);
  }

  return (
    <div className="__App">
      {/* Header of the app */}
      <Header />

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
          onChange={handleState}
        />
        {/* List of results based on search query */}
        <div className="__ResultsDiv">
          <div className="__Results">
            {data && data.length ? (
              data.map((d) => <Result data={d} key={nextId()} />)
            ) : (
              <div className="__placeHolderText">
                <h3>
                  {data === null
                    ? "Welcome!"
                    : "Sorry, no results found. Please try again."}
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
