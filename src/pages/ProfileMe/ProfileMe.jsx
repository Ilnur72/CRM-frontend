import { Avatar, IconButton } from "@mui/material";
import React from "react";
import iconEdit from "../../assets/ActionIcon/edit.svg";
import Loader from "../../components/Loader/Loader";
import { useAxios } from "../../hooks/useAxios";
import UpdateMeForm from "./components/UpdateMeForm";

const ProfileMe = () => {
  const [showUser, setShowUser] = React.useState({ isOpen: false });
  const { data, loading, refetch } = useAxios({
    url: `/users/me`,
    method: "get",
  });
  if (loading) return <Loader />;
  return <section style={{ backgroundColor: "#fff" }}></section>;
};

export default ProfileMe;
