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

const Sort = ({ filterAndSort, setFilterAndSort }) => {
  function cleaning() {
    setFilterAndSort({ by: "created_at", order: "desc", status: "all", q: "" });
  }
  return (
    <div className="flex items-end gap-3">
      <FormControl sx={{ minWidth: 120 }} size="small">
        <p className="ml-4 font-semibold text-primary">Search</p>
        <OutlinedInput
          value={filterAndSort.q}
          onChange={(e) =>
            setFilterAndSort({ ...filterAndSort, q: e.target.value })
          }
          placeholder="type..."
          sx={{
            ...SelectStyle,
            paddingRight: 0.5,
          }}
          endAdornment={
            <InputAdornment position="end">
              {filterAndSort.q ? (
                <IconButton
                  onClick={() => setFilterAndSort({ ...filterAndSort, q: "" })}
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
          value={filterAndSort.by}
          onChange={(event) =>
            setFilterAndSort({ ...filterAndSort, by: event.target.value })
          }
        >
          <MenuItem value={"created_at"}>Create Time</MenuItem>
          <MenuItem value={"first_name"}>First Name</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120 }} size="small">
        <p className="ml-4 font-semibold text-primary">Sort order</p>
        <Select
          sx={SelectStyle}
          value={filterAndSort.order}
          onChange={(event) =>
            setFilterAndSort({ ...filterAndSort, order: event.target.value })
          }
        >
          <MenuItem value={"asc"}>Ascending</MenuItem>
          <MenuItem value={"desc"}>Descending</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120 }} size="small">
        <p className="ml-4 font-semibold text-primary">Filter</p>
        <Select
          sx={SelectStyle}
          value={filterAndSort.status}
          onChange={(event) =>
            setFilterAndSort({ ...filterAndSort, status: event.target.value })
          }
        >
          <MenuItem value={"all"}>All</MenuItem>
          <MenuItem value={"ATTENDING"}>Attending</MenuItem>
          <MenuItem value={"PENDING"}>Pending</MenuItem>
          <MenuItem value={"SUSPENDED"}>Suspended</MenuItem>
          <MenuItem value={"COMPLETED"}>Completed</MenuItem>
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
