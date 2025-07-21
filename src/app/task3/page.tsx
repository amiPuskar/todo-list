"use client";
import { Box, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Nav from "../component/nav";

function DebouncedInput() {
  const [input, setInput] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(input);
    }, 500);

    return () => clearTimeout(handler);
  }, [input]);

  return (
    <Box>
      <Nav />
      <Box p={4} maxWidth={600} mx="auto">
        <Typography variant="h4" color="#000" mb={2}>
          Debounced Input example
        </Typography>
        <TextField
          label="Search Todos"
          variant="outlined"
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Typography variant="body1" mt={2} color="textSecondary">
          Debounced Value: {debouncedValue}
        </Typography>
      </Box>
    </Box>
  );
}
export default DebouncedInput;
