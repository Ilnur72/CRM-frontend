import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import axios from "axios";
import React, { useRef } from "react";
import { toast } from "react-toastify";
import CheckBox from "./Checkbox";
let notifyUser = [];

const UsersListModal = ({
  guideId,
  isOpen,
  setIsOpen,
  refetch,
  refetchData,
}) => {
  const listInnerRef = useRef();
  const [currPage, setCurrPage] = React.useState(1);
  const [prevPage, setPrevPage] = React.useState(0);
  const [userList, setUserList] = React.useState([]);
  const [wasLastList, setWasLastList] = React.useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/user-guides/bulk`, {
        guide_id: guideId,
        user_id: notifyUser,
      });
      toast.success("Ushbu Guide belgilangan foydalanuvchilarga yuborildi.");
      setIsOpen(false);
      notifyUser = [];
      refetch();
      refetchData();
    } catch (error) {
      if (error.response?.status == 400) {
        error.response?.data.message.map((err) => {
          toast.error(err);
        });
      }
    }
  };
  const handleCheck = (valueCheckBox) => {
    const value = valueCheckBox.target.name;
    notifyUser.includes(value)
      ? (notifyUser = notifyUser.filter((item) => item !== value))
      : notifyUser.push(value);
  };

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setCurrPage(currPage + 1);
      }
    }
  };
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `/users?page[limit]=10&page[offset]=${currPage}`
      );
      if (!response.data.data.length) {
        setWasLastList(true);
        return;
      }
      setPrevPage(currPage);
      setUserList([...userList, ...response.data.data]);
    };
    if (!wasLastList && prevPage !== currPage) {
      fetchData();
    }
  }, [currPage, wasLastList, prevPage, userList]);
  return (
    <Modal
      hideBackdrop={false}
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form
        onSubmit={submit}
        className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 w-96 p-10 rounded-xl "
      >
        <h2 className="text-2xl text-center text-primary font-bold">
          Update Guide
        </h2>
        <div
          onScroll={onScroll}
          ref={listInnerRef}
          className="overflow-auto h-72"
        >
          {userList?.map((user) => {
            return (
              <div key={user.id} className="flex items-center justify-between">
                <strong className="text-primary">{user.username}</strong>
                <CheckBox userId={user.id} handleCheck={handleCheck} />
              </div>
            );
          })}
        </div>
        <div className="flex justify-end gap-3">
          <Button
            onClick={() => {
              setIsOpen(false);
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

export default UsersListModal;
