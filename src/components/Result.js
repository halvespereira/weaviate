import React from "react";
import "./Result.css";

const Result = ({ data }) => {
  return (
    <div className="__Result">
      <h3 style={{ height: "125px" }}>
        <strong>Title: </strong>
        {data.title}
      </h3>
      <h4>
        <strong>Publication: </strong>
        {data.inPublication[0].name}
      </h4>
      <h4>
        <strong>Word Count: </strong>
        {data.wordCount}
      </h4>
      <div className="__url">
        <a href={data.url} target={data.url}>
          <strong>URL: </strong> <br />
          {data.url}
        </a>
      </div>

      <div className="__certainty">
        <h4>
          <strong>Certainty:</strong>
        </h4>
        <p>{data._additional.certainty.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Result;
