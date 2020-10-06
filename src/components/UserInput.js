import React, { useRef } from "react";

// Generate unique id
import nextId from "react-id-generator";

// List of publication to loop through
import publicationList from "../publications";

// Material UI library
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

// Spinner logo
import logoInverted from "../images/color.png";
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
  onChange,
}) => {
  // Using refs to target elements
  const searchButton = useRef();
  const spinner = useRef();

  // Handling state in parent component
  const handleChange = (e, f) => {
    onChange(e.target.value, f);
  };

  return (
    <div className="__UserInput">
      <form noValidate autoComplete="off">
        {/* Semantic word input */}
        <TextField
          type="text"
          id="filled-size-normal"
          value={word}
          onChange={(e) => handleChange(e, setWord)}
          className="__input"
          helperText="Semantic Word"
        />

        {/* Dropdown for publication list */}
        <FormControl className="__select">
          <Select
            value={publication}
            onChange={(e) => handleChange(e, setPublication)}
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

        {/* Greater than word count input */}
        <TextField
          helperText="Word Count Greater Than"
          type="number"
          step="100"
          id="filled-size-normal"
          value={count}
          onChange={(e) => handleChange(e, setCount)}
          className="__input"
        />

        {/* Results limit input */}
        <TextField
          helperText="Limit"
          type="number"
          id="filled-size-normal"
          value={limit}
          onChange={(e) => handleChange(e, setLimit)}
          className="__input"
        />

        {/* Submit button */}
        <button
          type="submit"
          onClick={(e) => searchFunction(e, spinner, searchButton)}
          ref={searchButton}
        >
          Search
        </button>
      </form>

      {/* Spinner logo */}
      <img
        src={logoInverted}
        alt="SeMI Logo"
        ref={spinner}
        className="__spinner"
      />
    </div>
  );
};

export default UserInput;
