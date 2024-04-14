import { Avatar, IconButton } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import iconBack from "../../../assets/back.svg";
import { useAxios } from "../../../hooks/useAxios";

const Profile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: { data },
  } = useAxios({ url: `/users/${id}`, method: "get" });

  return (
    <section className="" style={{ backgroundColor: "#fff" }}>
      <div className="py-5 mt-5">
        <div className="flex g-4">
          <div className="w-4/12 flex flex-col items-center justify-center gap-4 text-center text-white">
            <Avatar sx={{ width: 200, height: 200 }} />
            <div>
              <strong className="text-2xl text-primary">
                {data?.first_name} {data?.last_name}
              </strong>
            </div>
            <div className="flex gap-2">
              <IconButton
                onClick={() => {
                  navigate("/users");
                }}
                aria-label="edit"
                size="medium"
                sx={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "50%",
                  border: "1px solid #EAEEF4",
                  transition: "0.2s all",
                  gap: 1,
                  "&:hover": {
                    backgroundColor: "#514EF3",
                    width: "110px",
                    borderRadius: "20px",
                    "& > img": {
                      filter: "brightness(2000%)",
                    },
                    "& > p": {
                      display: "block",
                      color: "white",
                      fontSize: "16px",
                      filter: "brightness(2000%)",
                    },
                  },
                }}
              >
                <img src={iconBack} alt="" />
                <p className="hidden">Back</p>
              </IconButton>
            </div>
          </div>
          <div className="flex items-center gap-10 text-2xl">
            <div className="flex flex-col gap-4 text-primary">
              <strong>First Name:</strong>
              <strong>Last Name:</strong>
              <strong>Age:</strong>
              <strong>Username:</strong>
              <strong>Role:</strong>
              <strong>Total Guides:</strong>
              <strong>Todo Guides:</strong>
              <strong>Read Guides:</strong>
            </div>
            <div className="flex flex-col gap-4 text-primary">
              <strong>{data?.first_name}</strong>
              <strong>{data?.last_name}</strong>
              <strong>{data?.age}</strong>
              <strong>{data?.username}</strong>
              <strong>{data?.role}</strong>
              <strong>{data?.total_guides}</strong>
              <strong>{data?.todo_guides}</strong>
              <strong>{data?.read_guides}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
