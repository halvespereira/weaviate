import React from "react";
import "./result.css";
import nextId from "react-id-generator";

const Result = ({ data }) => {
  return (
    <div className="__Result">
      <h3>
        <strong>Title: </strong>
        {data.title}
      </h3>
      <h4>
        <strong>Publication: </strong>
        {data.InPublication[0].name}
      </h4>
      <div className="__url">
        <a href={data.url} target={data.url}>
          <strong>URL: </strong> <br />
          {data.url}
        </a>
      </div>

      <div className="__nearestNeighbors">
        <h4>
          <strong>Nearest Neighbors</strong>Nearest Neighbors
        </h4>
        <ul>
          {data._nearestNeighbors.neighbors.length > 0 ? (
            data._nearestNeighbors.neighbors.map((n) => (
              <li key={nextId()}>{n.concept} - </li>
            ))
          ) : (
            <p>Nearest neighbors not provided</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Result;
