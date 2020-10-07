import React from "react";

// List of publication to loop through
import publicationList from "../publications";

// Spinner img
import spinner from "../images/color.png";

// Material UI library
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

const UserInput = ({
  searchFunction,
  word,
  setWord,
  publication,
  setPublication,
  count,
  setCount,
  limit,
  setLimit,
  isSearching,
}) => {
  return (
    <div className="__UserInput">
      <form noValidate autoComplete="off">
        {/* Semantic word input */}
        <TextField
          type="text"
          id="filled-size-normal"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          className="__input"
          helperText="Semantic Word"
        />

        {/* Dropdown for publication list */}
        <FormControl className="__select">
          <Select
            value={publication}
            onChange={(e) => setPublication(e.target.value)}
            displayEmpty
          >
            <MenuItem value=""></MenuItem>
            {publicationList.map((p, idx) => (
              <MenuItem key={idx} value={p}>
                {p}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Publication</FormHelperText>
        </FormControl>

        {/* Greater than word count input */}
        <TextField
          helperText="Word Count Greater Than"
          type="number"
          step="100"
          id="filled-size-normal"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          className="__input"
        />

        {/* Results limit input */}
        <TextField
          helperText="Limit"
          type="number"
          id="filled-size-normal"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          className="__input"
        />

        {/* Submit button */}
        <button type="submit" onClick={(e) => searchFunction(e)}>
          {isSearching ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Spinner */}
      <img
        src={spinner}
        alt="Spinner"
        className={isSearching ? "__spinner" : "__noSpinner"}
      />
    </div>
  );
};

export default UserInput;
