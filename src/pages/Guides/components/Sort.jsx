import {
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import React from "react";

const SelectStyle = {
  width: 200,
  borderRadius: "30px",
  color: "#092C4C",
  fontSize: "16px",
  fontWeight: 500,
  background: "#fff",
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#514EF3",
  },
};

const Sort = ({ searchAndSort, setSearchAndSort }) => {
  function cleaning() {
    setSearchAndSort({ by: "id", order: "desc", role: "all", q: "" });
  }
  return (
    <div className="flex items-end gap-3">
      <FormControl sx={{ minWidth: 120 }} size="small">
        <p className="ml-4 font-semibold text-primary">Search</p>
        <OutlinedInput
          value={searchAndSort.q}
          onChange={(e) =>
            setSearchAndSort({ ...searchAndSort, q: e.target.value })
          }
          placeholder="type..."
          sx={{
            ...SelectStyle,
            paddingRight: 0.5,
          }}
          endAdornment={
            <InputAdornment position="end">
              {searchAndSort.q ? (
                <IconButton
                  onClick={() => setSearchAndSort({ ...searchAndSort, q: "" })}
                >
                  <i
                    className="fa-regular fa-circle-xmark"
                    style={{ color: "#514EF3" }}
                  ></i>
                </IconButton>
              ) : null}
            </InputAdornment>
          }
        />
      </FormControl>

      <FormControl sx={{ minWidth: 120 }} size="small">
        <p className="ml-4 font-semibold text-primary">Sort by</p>
        <Select
          sx={SelectStyle}
          value={searchAndSort.by}
          onChange={(event) =>
            setSearchAndSort({ ...searchAndSort, by: event.target.value })
          }
        >
          <MenuItem value={"id"}>Id</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120 }} size="small">
        <p className="ml-4 font-semibold text-primary">Sort order</p>
        <Select
          sx={SelectStyle}
          value={searchAndSort.order}
          onChange={(event) =>
            setSearchAndSort({ ...searchAndSort, order: event.target.value })
          }
        >
          <MenuItem value={"asc"}>Ascending</MenuItem>
          <MenuItem value={"desc"}>Descending</MenuItem>
        </Select>
      </FormControl>

      <FormControl
        sx={{ display: "flex", flex: "column", alignItems: "center" }}
      >
        <p className=" font-semibold text-primary">Cleaning</p>
        <IconButton onClick={cleaning} variant="outlined">
          <i
            className="fa-solid fa-filter-circle-xmark"
            style={{ color: "#514EF3" }}
          ></i>
        </IconButton>
      </FormControl>
    </div>
  );
};

export default Sort;
