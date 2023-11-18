import {
  Paper,
  Grid,
  TextField,
  Typography,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const columns = [
  { id: "level", name: "Level", minWidth: 170 },
  { id: "message", name: "Message", minWidth: 170 },
  { id: "resourceId", name: "Resource Id", minWidth: 170 },
  { id: "timestamp", name: "Timestamp", minWidth: 170 },
  { id: "traceId", name: "Trace Id", minWidth: 170 },
  { id: "spanId", name: "Span Id", minWidth: 170 },
  { id: "commit", name: "Commit", minWidth: 170 },
  { id: "parentResourceId", name: "Parent Resource Id", minWidth: 170 },
];

function App() {
  const [form, setForm] = useState({
    level: "",
    message: "",
    resourceId: "",
    startTimestamp: dayjs(new Date().toISOString()),
    endTimestamp: dayjs(new Date().toISOString()),
    traceId: "",
    spanId: "",
    commit: "",
    parentResourceId: "",
  });

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);

  const rowsPerPage = 25;

  const fetchData = async () => {
    try {
      const res = await fetch(
        `http://backend:3000/api/logs?page=${page}&level=${
          form.level
        }&message=${form.message}&resourceId=${
          form.resourceId
        }&startTimestamp=${form.startTimestamp.toISOString()}&endTimestamp=${form.endTimestamp.toISOString()}&traceId=${
          form.traceId
        }&spanId=${form.spanId}&commit=${form.commit}&parentResourceId=${
          form.parentResourceId
        }`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setRows(data.logs);
      setCount(data.count);
      alert("Search successful!");
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  const resetForm = () => {
    setForm({
      level: "",
      message: "",
      resourceId: "",
      startTimestamp: dayjs(new Date().toISOString()),
      endTimestamp: dayjs(new Date().toISOString()),
      traceId: "",
      spanId: "",
      commit: "",
      parentResourceId: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const formFields = [
    <TextField
      id="level"
      size="small"
      label="Level"
      name="level"
      variant="outlined"
      value={form.level}
      onChange={handleChange}
      fullWidth
    />,
    <TextField
      id="message"
      size="small"
      label="Message"
      name="message"
      variant="outlined"
      value={form.message}
      onChange={handleChange}
      maxRows={5}
      multiline
      fullWidth
    />,
    <TextField
      id="resourceId"
      size="small"
      label="Resource Id"
      name="resourceId"
      variant="outlined"
      value={form.resourceId}
      onChange={handleChange}
      fullWidth
    />,
    <TextField
      id="traceId"
      size="small"
      label="Trace Id"
      name="traceId"
      variant="outlined"
      value={form.traceId}
      onChange={handleChange}
      fullWidth
    />,
    <TextField
      id="spanId"
      size="small"
      label="Span Id"
      name="spanId"
      variant="outlined"
      value={form.spanId}
      onChange={handleChange}
      fullWidth
    />,
    <TextField
      id="commit"
      size="small"
      label="Commit"
      name="commit"
      variant="outlined"
      value={form.commit}
      onChange={handleChange}
      fullWidth
    />,
    <TextField
      id="parentResourceId"
      size="small"
      label="Parent Resource Id"
      name="parentResourceId"
      variant="outlined"
      value={form.parentResourceId}
      onChange={handleChange}
      fullWidth
    />,
    <></>,
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label="Start Timestamp"
        value={form.startTimestamp}
        onChange={(newValue) =>
          setForm((prev) => ({ ...prev, startTimestamp: newValue }))
        }
        sx={{
          width: "100%",
        }}
      />
    </LocalizationProvider>,
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label="End Timestamp"
        value={form.endTimestamp}
        onChange={(newValue) =>
          setForm((prev) => ({ ...prev, endTimestamp: newValue }))
        }
        sx={{
          width: "100%",
        }}
      />
    </LocalizationProvider>,
  ];

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <>
      <Paper
        sx={{
          display: "flex",
          elevation: "1",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
          maxWidth: "750px",
          mx: "auto",
          my: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Filters
        </Typography>
        <Grid
          component="form"
          container
          spacing={{ xs: 2, sm: 3 }}
          noValidate
          p={2}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          {formFields.map((field, index) => (
            <Grid item xs={12} sm={6} key={index}>
              {field}
            </Grid>
          ))}
          <Grid item xs={6} display="flex" justifyContent="center">
            <Button
              variant="contained"
              type="submit"
              sx={{ maxWidth: "250px" }}
              fullWidth
            >
              Search
              <SearchIcon sx={{ ml: "10px" }} />
            </Button>
          </Grid>
          <Grid item xs={6} display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="secondary"
              sx={{ maxWidth: "250px" }}
              fullWidth
              onClick={resetForm}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Paper
        sx={{
          display: "flex",
          elevation: "1",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
          maxWidth: "750px",
          mx: "auto",
          my: 2,
        }}
      >
        <Typography mx="auto" variant="h5" gutterBottom>
          Result
        </Typography>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0 &&
                rows.map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
        />
      </Paper>
    </>
  );
}

export default App;
