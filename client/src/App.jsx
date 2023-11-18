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
import { useState } from "react";

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
    timestamp: "",
    traceId: "",
    spanId: "",
    commit: "",
    parentResourceId: "",
  });

  const [rows, setRows] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    try {
      const res = await fetch(
        `http://localhost:3000/api/logs?level=${form.level}&message=${form.message}&resourceId=${form.resourceId}&timestamp=${form.timestamp}&traceId=${form.traceId}&spanId=${form.spanId}&commit=${form.commit}&parentResourceId=${form.parentResourceId}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      console.log(data);
      setRows(data.logs);
      alert("Search successful!");
    } catch (err) {
      console.log(err);
      alert(err);
    }
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
      id="timestamp"
      size="small"
      name="timestamp"
      variant="outlined"
      value={form.timestamp}
      onChange={handleChange}
      fullWidth
      type="datetime-local"
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
  ];

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
          <Grid item xs={12} display="flex" justifyContent="center">
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
        </Grid>
      </Paper>
      <Paper
        sx={{
          overflow: "hidden",
          maxWidth: "750px",
          mx: "auto",
          p: 2,
        }}
      >
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
      </Paper>
    </>
  );
}

export default App;
