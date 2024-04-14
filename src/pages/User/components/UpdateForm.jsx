import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Visibility from "../../../assets/visibility.svg";
import VisibilityOff from "../../../assets/visibilityOff.svg";

const UpdateForm = ({ showUser, setShowUser, refetch }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isOpenInput, setIsOpenInput] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const submit = async (formData) => {
    try {
      await axios.patch(`/users/${showUser.data?._id}`, {
        ...formData,
        age: Number(formData.age),
      });

      toast.success("Foydalanuvchi muvaffaqiyatli Tahrirlandi.");
      setShowPassword(false);
      setIsOpenInput(false);
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
          Update User
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
        <FormControl size="small">
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
            {...register("role")}
            labelId="demo-simple-select-label"
            label="Role"
            sx={{ borderRadius: "25px" }}
            defaultValue={showUser.data?.role}
          >
            <MenuItem value={"admin"}>Admin</MenuItem>
            <MenuItem value={"employee"}>Employee</MenuItem>
          </Select>
        </FormControl>
        <TextField
          defaultValue={showUser.data?.username}
          {...register("username", { required: true })}
          InputProps={{ style: { borderRadius: "25px" } }}
          variant="outlined"
          size="small"
          label="Username"
        />
        <Button
          sx={{ display: isOpenInput ? "none" : "block" }}
          onClick={() => setIsOpenInput(true)}
        >
          Change password
        </Button>
        {isOpenInput ? (
          <TextField
            {...register("password", {
              required: true,
            })}
            InputProps={{
              style: { borderRadius: "25px" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <img
                      width={20}
                      src={showPassword ? VisibilityOff : Visibility}
                      alt=""
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            label="password"
            size="small"
            type={showPassword ? "text" : "password"}
            color={errors.password ? "error" : "info"}
          />
        ) : null}
        <div className="flex justify-end gap-3">
          <Button
            onClick={() => {
              setShowUser({ isOpen: false });
              setIsOpenInput(false);
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

export default UpdateForm;
