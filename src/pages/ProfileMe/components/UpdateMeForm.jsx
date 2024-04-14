import { Button, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const UpdateMeForm = ({ showUser, setShowUser, refetch }) => {
  const { register, handleSubmit, reset } = useForm();

  const submit = async (formData) => {
    try {
      await axios.patch(`/users/me`, {
        ...formData,
        age: Number(formData.age),
      });
      toast.success("Malumotlaringiz muvaffaqiyatli tahrirlandi.");
      setShowUser({ isOpen: false });
      reset();
      refetch();
    } catch (error) {
      if (error.response?.status == 400) {
        error.response?.data.message.map((err) => {
          toast.error(err);
        });
      }
    }
  };
  return (
    <Modal
      hideBackdrop={false}
      open={showUser.isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form
        onSubmit={handleSubmit(submit)}
        className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 w-96 p-10 rounded-xl "
      >
        <h2 className="text-2xl text-center text-primary font-bold">
          Update Me
        </h2>
        <TextField
          {...register("first_name", { required: true })}
          defaultValue={showUser.data?.first_name}
          InputProps={{ style: { borderRadius: "25px" } }}
          variant="outlined"
          size="small"
          label="First Name"
        />
        <TextField
          {...register("last_name", { required: true })}
          defaultValue={showUser.data?.last_name}
          InputProps={{ style: { borderRadius: "25px" } }}
          variant="outlined"
          size="small"
          label="Last Name"
        />
        <TextField
          {...register("age", { required: true })}
          defaultValue={showUser.data?.age}
          InputProps={{ style: { borderRadius: "25px" } }}
          type="number"
          variant="outlined"
          size="small"
          label="Age"
        />
        <TextField
          defaultValue={showUser.data?.username}
          {...register("username", { required: true })}
          InputProps={{ style: { borderRadius: "25px" } }}
          variant="outlined"
          size="small"
          label="Username"
        />
        <div className="flex justify-end gap-3">
          <Button
            onClick={() => {
              setShowUser({ isOpen: false });
              reset();
            }}
            color="inherit"
            variant="contained"
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateMeForm;
