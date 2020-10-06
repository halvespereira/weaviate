import React, { useRef } from "react";
import nextId from "react-id-generator";
import publicationList from "../publications";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
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
  const searchButton = useRef();
  const spinner = useRef();

  // Handling state in parent component
  const handleChange = (e, f) => {
    onChange(e.target.value, f);
  };

  return (
    <div className="__UserInput">
      <form noValidate autoComplete="off">
        <TextField
          type="text"
          id="filled-size-normal"
          value={word}
          onChange={(e) => handleChange(e, setWord)}
          className="__input"
          helperText="Semantic Word"
        />
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

        <TextField
          helperText="Word Count Greater Than"
          type="number"
          step="100"
          id="filled-size-normal"
          value={count}
          onChange={(e) => handleChange(e, setCount)}
          className="__input"
        />

        <TextField
          helperText="Limit"
          type="number"
          id="filled-size-normal"
          value={limit}
          onChange={(e) => handleChange(e, setLimit)}
          className="__input"
        />

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
