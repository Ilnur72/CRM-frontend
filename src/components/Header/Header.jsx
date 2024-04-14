import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { openState, openStateGuide } from "../../store/openStateSlice";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.userData);
  return (
    <div
      style={{ background: "#F6FAFD" }}
      className="sticky top-0 z-10 shadow-md"
    >
      <div className="container mx-auto h-16 text-primary text-2xl font-extrabold flex justify-between items-center">
        <h2>
          {location.pathname == "/"
            ? "DASHBOARD"
            : location.pathname.split("/").splice(1, 1).join("").toUpperCase()}
        </h2>
        <div className="flex gap-4 items-center">
          <Button
            onClick={() => dispatch(openState(true))}
            sx={{
              display:
                user?.role === "admin" && location.pathname == "/users"
                  ? "block"
                  : "none",
              background: "#4b48e2",
              ":hover": { background: "#514eec" },
              borderRadius: "70px",
              paddingX: "20px",
              paddingY: "10px",
            }}
            variant="contained"
          >
            Add new User <i className="fa-solid fa-user-plus fa-lg ml-2"></i>
          </Button>
          <Button
            onClick={() => dispatch(openStateGuide(true))}
            sx={{
              display:
                user?.role === "admin" && location.pathname == "/guides"
                  ? "block"
                  : "none",
              background: "#4b48e2",
              ":hover": { background: "#514eec" },
              borderRadius: "70px",
              paddingX: "20px",
              paddingY: "10px",
            }}
            variant="contained"
          >
            Add new Guides <i className="fa-solid fa-scale-balanced"></i>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
