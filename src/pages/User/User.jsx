import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { useAxios } from "../../hooks/useAxios";
import CreateForm from "./components/CreateForm";
import UpdateForm from "./components/UpdateForm";
import Sort from "./components/sort";

//img
import iconDelete from "../../assets/ActionIcon/delete.svg";
import iconEdit from "../../assets/ActionIcon/edit.svg";
import iconView from "../../assets/ActionIcon/view.svg";

const User = () => {
  const navigate = useNavigate();
  const [showUser, setShowUser] = React.useState({ isOpen: false });

  const [filterAndSort, setFilterAndSort] = React.useState({
    status: "all",
    by: "created_at",
    order: "desc",
    q: "",
  });
  const [row, setRow] = React.useState(10);
  const [page, setPage] = React.useState(1);

  const { data, loading, refetch } = useAxios({
    url: `/student?page[offset]=${page}&page[limit]=${row}&q=${
      filterAndSort.q
    }&sort[by]=${
      filterAndSort.by
    }&sort[order]=${filterAndSort.order.toUpperCase()}${
      filterAndSort.status === "all"
        ? ""
        : `&filters[status]=${filterAndSort.status}`
    }`,
    // {{base_url}}/student?page[limit]=3&page[offset]=1&filters[status]=ACTIVE&sort[by]=created_at&sort[order]=ASC&search=john
    method: "get",
  });
  async function showData(id) {
    const { data } = await axios.get(`/users/${id}`);
    setShowUser({ isOpen: true, ...data });
  }
  React.useEffect(() => {
    if (data.data?.length === 0 && page !== 1) setPage(page - 1);
  }, [data]);
  if (loading) return <Loader />;
  return (
    <>
      <CreateForm refetch={refetch} />
      <UpdateForm
        showUser={showUser}
        setShowUser={setShowUser}
        refetch={refetch}
      />
      <div className="flex items-center justify-between pt-2">
        <strong className="font-bold text-base text-primary">
          Total: {data.pageInfo?.total} user
        </strong>
        <div className="flex items-center pb-2">
          <Sort
            filterAndSort={filterAndSort}
            setFilterAndSort={setFilterAndSort}
          />
        </div>
      </div>

      <table className="min-w-max w-full table-auto">
        <thead>
          <tr className="text-lg text-primary font-bold">
            <th>#ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Group Name</th>
            <th>Phone Number</th>
            <th>Balance</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-base font-semibold text-primary text-center">
          {data.data.data?.map((item, index) => (
            <tr key={item.id}>
              <td className="py-3">{index + 1}</td>
              <td className="py-3">{item.first_name}</td>
              <td className="py-3">{item.last_name}</td>
              <td className="py-3">{item.group?.title}</td>
              <td className="py-3">{item.phone_number}</td>
              <td className="py-3">{item.balance}</td>
              <td className="py-3">{item.status}</td>
              <td className="py-3flex space-x-2">
                <IconButton
                  onClick={() => {
                    navigate(`/users/${item.id}`);
                  }}
                  aria-label="view"
                  size="medium"
                  sx={{
                    width: "35px",
                    height: "35px",
                    border: "1px solid #EAEEF4",
                    "&:hover": {
                      backgroundColor: "#514EF3",
                      "& > img": {
                        filter: "brightness(2000%)",
                      },
                    },
                  }}
                >
                  <img src={iconView} alt="" />
                </IconButton>
                <IconButton
                  onClick={() => {
                    showData(item.id);
                  }}
                  aria-label="edit"
                  size="medium"
                  sx={{
                    mx: 1,
                    width: "35px",
                    height: "35px",
                    border: "1px solid #EAEEF4",
                    "&:hover": {
                      backgroundColor: "#514EF3",
                      "& > img": {
                        filter: "brightness(2000%)",
                      },
                    },
                  }}
                >
                  <img src={iconEdit} alt="" />
                </IconButton>
                <IconButton
                  sx={{
                    width: "35px",
                    height: "35px",
                    border: "1px solid #EAEEF4",
                    "&:hover": {
                      backgroundColor: "#514EF3",
                      "& > img": {
                        filter: "brightness(2000%)",
                      },
                    },
                  }}
                  onClick={() => {
                    axios.delete(`/users/${item.id}`);
                    refetch();
                  }}
                  aria-label="delete"
                  size="medium"
                >
                  <img src={iconDelete} alt="" />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div align="center" className="flex justify-center items-center py-2">
        <Stack spacing={2}>
          <Pagination
            onChange={(_, page) => setPage(page)}
            count={data.pageInfo && Math.ceil(data.pageInfo?.total / row)}
            variant="outlined"
            shape="rounded"
            page={page}
          />
        </Stack>
        <FormControl sx={{ width: "80px" }}>
          <InputLabel size="small" id="demo-simple-select-label">
            Row
          </InputLabel>
          <Select
            size="small"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={row}
            label="Row"
            onChange={(e) => setRow(e.target.value)}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </FormControl>
      </div>
    </>
  );
};

export default User;
