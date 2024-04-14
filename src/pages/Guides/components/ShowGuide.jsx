import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import backIcon from "../../../assets/back.svg";
import { useAxios } from "../../../hooks/useAxios";
import UsersListModal from "./UsersListModal";

const ShowGuide = ({ refetchData }) => {
  const { user } = useSelector((state) => state.userData);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const { guide_id } = useParams();
  const {
    data: { data },
    refetch,
  } = useAxios({ url: `/guides/${guide_id}`, method: "get" });
  return (
    <section className="p-4" style={{ backgroundColor: "#fff" }}>
      {user?.role === "admin" ? (
        <UsersListModal
          guideId={guide_id}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          refetch={refetch}
          refetchData={refetchData}
        />
      ) : null}
      <div className="py-4">
        <div className="flex justify-between items-center pb-4">
          <strong className="text-lg text-primary py-4">
            revisions: {data?.revisions} ta user ga biriktirilgan
          </strong>
          <Button
            onClick={() => setIsOpen(true)}
            sx={{
              display: user?.role === "admin" ? "block" : "none",
              background: "#4b48e2",
              ":hover": { background: "#514eec" },
              borderRadius: "70px",
              paddingX: "20px",
              paddingY: "10px",
            }}
            variant="contained"
          >
            Send to User
          </Button>
        </div>
        <hr />
        <div className=" flex justify-center items-start gap-10 text-center text-primary mt-2">
          <div className="flex flex-col w-1/2 items-center gap-4">
            <h2 className="text-2xl font-extrabold text-primary">
              {data?.title}
            </h2>
            <p className="text-lg text-primary">{data?.content}</p>
          </div>
        </div>
      </div>
      <Button
        onClick={() => navigate("/guides")}
        sx={{
          background: "#4b48e2",
          ":hover": { background: "#514eec" },
          borderRadius: "70px",
          paddingX: "20px",
          paddingY: "10px",
          gap: 1,
        }}
        variant="contained"
      >
        <img style={{ filter: "brightness(2000%)" }} src={backIcon} alt="" />{" "}
        Back
      </Button>
    </section>
  );
};

export default ShowGuide;
