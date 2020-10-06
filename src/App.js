import React, { useState, useEffect, useRef } from "react";
import logo from "./images/logo-horizontal-payoff.png";
import "./App.css";
import weaviate from "weaviate-client";
import Result from "./components/Result";
import nextId from "react-id-generator";
import publicationList from "./publications";

function App() {
  const [word, setWord] = useState("");
  const [publication, setPublication] = useState("");
  const [data, setData] = useState(null);
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(100);
  const searchButton = useRef();

  // weaviate setup
  const client = weaviate.client({
    scheme: "https",
    host: "demo.dataset.playground.semi.technology/",
  });

  useEffect(() => {
    console.log(data);
  });

  // Search function that runs when user presses 'enter'
  const search = (e) => {
    e.preventDefault();

    if (word && !publication) {
      e.target.textContent = "Searching...";
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
            console.log(res);
            setData(res.data.Get.Things.Article);
          })
          .catch((err) => {
            console.error(err);
          });
        searchButton.current.textContent = "Search";
      }, 500);
    }

    if (word && publication) {
      e.target.textContent = "Searching...";

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
          })
          .catch((err) => {
            console.error(err);
          });
        searchButton.current.textContent = "Search";
      }, 500);
    }
    setWord("");
    setLimit(100);
    setCount(0);
    setPublication("");
  };

  return (
    <div className="__App">
      {/* Header of the app */}
      <header>
        <img src={logo} alt="SeMI logo" className="logo" />
      </header>

      <div className="__Body">
        <div className="__UserInput">
          <form>
            <input
              onChange={(e) => setWord(e.target.value)}
              value={word}
              placeholder="Type here"
            />

            <select
              placeholder="Enter Publication"
              onChange={(e) => setPublication(e.target.value)}
              value={publication}
            >
              <option value="" disabled selected>
                Select a publication
              </option>
              {publicationList.map((p) => (
                <option key={nextId()}>{p}</option>
              ))}
            </select>

            <input
              id="wordCount"
              type="number"
              onChange={(e) => setCount(e.target.value)}
              value={count}
            />

            <input
              type="number"
              onChange={(e) => setLimit(e.target.value)}
              value={limit}
            />
            <button type="submit" onClick={search} ref={searchButton}>
              Search
            </button>
          </form>
        </div>
        <div className="__Results">
          {data && data.length ? (
            data.map((d) => <Result data={d} key={nextId()} />)
          ) : (
            <h4>
              {data === null
                ? "Welcome!"
                : "Sorry, no results found. Please try again."}
            </h4>
          )}
        </div>
      </div>
      {/* Input section - where user does his search and filters it */}
    </div>
  );
}

export default App;
