import { Button, IconButton } from "@mui/material";
import Modal from "@mui/material/Modal";
import axios from "axios";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { openState } from "../../../store/openStateSlice";
import { useAxios } from "../../../hooks/useAxios";
import { Select, Option } from "@material-tailwind/react";

const inputStyle = `pl-4 w-full h-10 rounded-lg bg-grey10
border border-grey30 outline-none text-primary`;
const CreateForm = ({ refetch }) => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.openState);
  const {
    data: { data },
    loading,
  } = useAxios({ url: "/group", method: "get" });
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
  } = useForm();

  const submit = async (formData) => {
    try {
      if (formData.group_id === "PENDING") {
        delete formData.group_id;
        formData.status = "ATTENDING";
      }
      await axios.post("/student", {
        ...formData,
        status:
          formData.group_id === "PENDING" ? formData.group_id : "ATTENDING",
      });
      toast.success("Foydalanuvchi muvaffaqiyatli qo'shildi.");
      dispatch(openState(false));
      reset();
      refetch();
    } catch (error) {
      if (error.response?.status == 502) {
        toast.error(error.response.data.message);
      }
      if (error.response.status == 400) {
        error.response?.data.message.map((err) => {
          toast.error(err);
        });
      }
    }
  };
  if (loading) return;
  return (
    <Modal
      hideBackdrop={false}
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form
        onSubmit={handleSubmit(submit)}
        className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 w-96 p-8 rounded-xl "
      >
        <div className="flex justify-between items-center ">
          <h2 className="text-2xl text-center text-primary font-bold">
            Create User
          </h2>
          <IconButton
            onClick={() => {
              dispatch(openState(false));
              reset();
            }}
            sx={{
              background: "#7E92A2",
              ":hover": { bgcolor: "#7E92A2" },
            }}
            className="w-4 h-4 rounded-full bg-grey70"
          >
            <i className="fa-solid text-xs text-white fa-xmark"></i>
          </IconButton>
        </div>
        <div>
          <label className="text-primary">First Name</label>
          <input
            {...register("first_name", { required: true })}
            placeholder="First Name"
            className={inputStyle}
            type="text"
          />
        </div>
        <input
          {...register("last_name", { required: true })}
          placeholder="Last Name"
          className={inputStyle}
          type="text"
        />
        <input
          {...register("phone_number", { required: true })}
          placeholder="Phone"
          className={inputStyle}
          type="text"
        />

        <Controller
          name="group_id"
          control={control}
          defaultValue="PENDING"
          render={({ field: { onChange, ...field } }) => (
            <Select
              className="bg-grey10 border border-grey30 focus:border-grey30 text-primary"
              labelProps={{
                className: "after:border-none before:border-none",
              }}
              onChange={(event) => {
                setValue("group_id", event);
              }}
              {...field}
              selected={(element) => {
                return element;
              }}
            >
              <Option value="PENDING" className="bg-grey10 text-primary">
                Undecided
              </Option>
              {data.data.map((group, i) => {
                return (
                  <Option
                    value={group.id}
                    className="bg-grey10 text-primary"
                    key={i}
                  >
                    {group.title}
                  </Option>
                );
              })}
            </Select>
          )}
        />
        <div className="flex justify-end gap-3">
          <Button
            sx={{ background: "#514EF3", borderRadius: 24 }}
            type="submit"
            variant="contained"
          >
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateForm;
