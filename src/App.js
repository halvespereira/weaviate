import React, { useState, useEffect, useRef } from "react";
import logo from "./images/logo-horizontal-payoff.png";
import logoInverted from "./images/color.png";
import "./App.css";
import weaviate from "weaviate-client";
import Result from "./components/Result";
import nextId from "react-id-generator";
import publicationList from "./publications";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

function App() {
  const [word, setWord] = useState("");
  const [publication, setPublication] = useState("");
  const [data, setData] = useState(null);
  const [count, setCount] = useState("");
  const [limit, setLimit] = useState("");
  const searchButton = useRef();
  const spinner = useRef();

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
      spinner.current.style.animation = "spin 0.5s 3.0s linear infinite";

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

  return (
    <div className="__App">
      {/* Header of the app */}
      <header>
        <img src={logo} alt="SeMI logo" className="__logo" />
      </header>

      <div className="__Body">
        <div className="__UserInput">
          <form noValidate autoComplete="off">
            <TextField
              type="text"
              id="filled-size-normal"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              className="__input"
              helperText="Semantic Word"
            />
            <FormControl className="__select">
              <Select
                value={publication}
                onChange={(e) => setPublication(e.target.value)}
                displayEmpty
              >
                <MenuItem value=""></MenuItem>
                {publicationList.map((p) => (
                  <MenuItem key={nextId()} value={p}>
                    {p}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Publication</FormHelperText>
            </FormControl>

            <TextField
              helperText="Word Count Greater Than"
              type="number"
              step="100"
              id="filled-size-normal"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              className="__input"
            />

            <TextField
              helperText="Limit"
              type="number"
              id="filled-size-normal"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              className="__input"
            />

            <button type="submit" onClick={search} ref={searchButton}>
              Search
            </button>
          </form>
          <img
            src={logoInverted}
            alt="SeMI Logo"
            ref={spinner}
            className="__spinner"
          />
        </div>
        <div className="__Results">
          {data && data.length ? (
            data.map((d) => <Result data={d} key={nextId()} />)
          ) : (
            <h3>
              {data === null
                ? "Welcome!"
                : "Sorry, no results found. Please try again."}
            </h3>
          )}
        </div>
      </div>
      {/* Input section - where user does his search and filters it */}
    </div>
  );
}

export default App;
