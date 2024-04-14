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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { useAxios } from "../../hooks/useAxios";
import CreateForm from "./components/CreateForm";
import UpdateForm from "./components/UpdateForm";
import Sort from "./components/sort";

//img
import iconEdit from "../../assets/ActionIcon/edit.svg";
import iconView from "../../assets/ActionIcon/view.svg";

const Guides = () => {
  const { user } = useSelector((state) => state.userData);
  const navigate = useNavigate();
  const [showGuide, setShowGuide] = React.useState({ isOpen: false });

  const [searchAndSort, setSearchAndSort] = React.useState({
    by: "id",
    order: "desc",
    q: "",
  });
  const [row, setRow] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const { data, loading, refetch } = useAxios({
    url: `/guides?page[offset]=${page}&page[limit]=${row}&q=${searchAndSort.q}&sort[by]=${searchAndSort.by}&sort[order]=${searchAndSort.order}`,
    method: "get",
  });
  async function showData(id) {
    const { data } = await axios.get(`/guides/${id}`);
    setShowGuide({ isOpen: true, ...data });
  }
  React.useEffect(() => {
    if (data.data?.length === 0 && page !== 1) setPage(page - 1);
  }, [data]);
  if (loading) return <Loader />;

  return (
    <>
      <CreateForm refetch={refetch} />
      <UpdateForm
        showGuide={showGuide}
        setShowGuide={setShowGuide}
        refetch={refetch}
      />
      <div className="flex items-center justify-between pt-2">
        <strong className="font-bold text-base text-primary">
          Total: {data.pageInfo?.total} guide
        </strong>
        <div className="flex items-center pb-2">
          <Sort
            searchAndSort={searchAndSort}
            setSearchAndSort={setSearchAndSort}
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
                Title
              </TableCell>
              <TableCell
                sx={{ fontSize: 16, fontWeight: 800, color: "#092C4C" }}
                align="center"
              >
                Content
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
                  {item.title}
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
                  {item.content.slice(0, 50)}
                  {item.content.length < 50 ? "" : "..."}
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
                      navigate(`/guides/${item.id}`);
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
                      display: user?.role === "admin" ? null : "none",
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

export default Guides;
