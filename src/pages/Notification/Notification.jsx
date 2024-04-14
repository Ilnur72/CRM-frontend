import {
  FormControl,
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
import React from "react";
import Loader from "../../components/Loader/Loader";
import { useAxios } from "../../hooks/useAxios";
import CustomButton from "./components/CustomButton/CustomButton";

const SelectStyle = {
  width: 200,
  borderRadius: "30px",
  color: "#092C4C",
  fontSize: "16px",
  fontWeight: 500,
  background: "#fff",
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#514EF3",
  },
};

const Notification = ({refetchData}) => {
  const [filter, setFilter] = React.useState("all");
  const [row, setRow] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const { data, loading, refetch } = useAxios({
    url: `/user-guides?page[offset]=${page}&page[limit]=${row}${
      filter === "all" ? "" : `&filters[completed]=${filter}`
    }`,
    method: "get",
  });
  React.useEffect(() => {
    if (data.data?.length === 0 && page !== 1) setPage(page - 1);
  }, [data]);
  if (loading) return <Loader />;

  return (
    <>
      <div className="flex items-center justify-between pt-2">
        <strong className="font-bold text-base text-primary">
          Total: {data.pageInfo?.total} guide
        </strong>
        <div className="flex items-center pb-2">
          <FormControl sx={{ minWidth: 120 }} size="small">
            <p className="ml-4 font-semibold text-primary">Filter</p>
            <Select
              sx={SelectStyle}
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
            >
              <MenuItem value={"all"}>All</MenuItem>
              <MenuItem value={"true"}>Completed</MenuItem>
              <MenuItem value={"false"}>Not Completed</MenuItem>
            </Select>
          </FormControl>
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
                align="left"
              >
                Title
              </TableCell>
              <TableCell
                sx={{ fontSize: 16, fontWeight: 800, color: "#092C4C" }}
                align="left"
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
                key={item._id}
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
                  align="left"
                >
                  {item.guide.title}
                </TableCell>
                <TableCell
                  sx={{
                    maxWidth: 550,
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#092C4C",
                    paddingY: 0.8,
                  }}
                  align="left"
                >
                  {item.guide.content}
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
                  <CustomButton
                    userGuideId={item._id}
                    guideCompleted={item.completed}
                    refetch={refetch}
                    refetchData={refetchData}
                  />
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

export default Notification;
