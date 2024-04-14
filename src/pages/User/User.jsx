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
    role: "all",
    by: "id",
    order: "desc",
    q: "",
  });
  const [row, setRow] = React.useState(10);
  const [page, setPage] = React.useState(1);

  const { data, loading, refetch } = useAxios({
    url: `/users?page[offset]=${page}&page[limit]=${row}&q=${
      filterAndSort.q
    }&sort[by]=${filterAndSort.by}&sort[order]=${filterAndSort.order}${
      filterAndSort.role === "all" ? "" : `&filters[role]=${filterAndSort.role}`
    }`,
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

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontSize: 16, fontWeight: 800, color: "#092C4C" }}
                align="left"
              >
                #ID
              </TableCell>
              <TableCell
                sx={{ fontSize: 16, fontWeight: 800, color: "#092C4C" }}
                align="center"
              >
                First Name
              </TableCell>
              <TableCell
                sx={{ fontSize: 16, fontWeight: 800, color: "#092C4C" }}
                align="center"
              >
                Last Name
              </TableCell>
              <TableCell
                sx={{ fontSize: 16, fontWeight: 800, color: "#092C4C" }}
                align="center"
              >
                Age
              </TableCell>
              <TableCell
                sx={{ fontSize: 16, fontWeight: 800, color: "#092C4C" }}
                align="center"
              >
                Username
              </TableCell>
              <TableCell
                sx={{ fontSize: 16, fontWeight: 800, color: "#092C4C" }}
                align="center"
              >
                Role
              </TableCell>
              <TableCell
                sx={{ fontSize: 16, fontWeight: 800, color: "#092C4C" }}
                align="center"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data?.map((item, index) => (
              <TableRow
                key={item.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell
                  sx={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#092C4C",
                    paddingY: 0.8,
                  }}
                  align="left"
                >
                  {index + 1}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#092C4C",
                    paddingY: 0.8,
                  }}
                  align="center"
                >
                  {item.first_name}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#092C4C",
                    paddingY: 0.8,
                  }}
                  align="center"
                >
                  {item.last_name}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#092C4C",
                    paddingY: 0.8,
                  }}
                  align="center"
                >
                  {item.age}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#092C4C",
                    paddingY: 0.8,
                  }}
                  align="center"
                >
                  {item.username}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#092C4C",
                    paddingY: 0.8,
                  }}
                  align="center"
                >
                  {item.role}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#092C4C",
                    paddingY: 0.8,
                  }}
                  align="center"
                >
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
