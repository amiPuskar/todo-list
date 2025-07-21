"use client";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import editIcon from "../../public/edit.png";
import deleteIcon from "../../public/delete.png";
import addicon from "../../public/add.png";
import Link from "next/link";
import Nav from "./component/nav";

type Todo = {
  id: number;
  text: string;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) {
      setTodos(JSON.parse(stored));
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Debounced search
  useEffect(() => {
    const timeout = setTimeout(() => {
      const filtered = todos.filter((t) =>
        t.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTodos(filtered);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm, todos]);

  const handleAddOrUpdate = () => {
    if (!input.trim()) return;

    if (editId) {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === editId ? { ...todo, text: input } : todo
        )
      );
      setEditId(null);
    } else {
      setTodos((prev) => [...prev, { id: Date.now(), text: input.trim() }]);
    }

    setInput("");
  };

  const handleEdit = (id: any) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      setInput(todo.text);
      setEditId(id);
    }
  };

  const handleDelete = (id: any) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <Box>
      <Nav />
      <Box p={4} maxWidth={600} mx="auto">
        <Typography variant="h4" color="#000" mb={2}>
          ToDo List
        </Typography>

        <TextField
          fullWidth
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Box display="flex" gap={2} mb={3}>
          <TextField
            fullWidth
            placeholder="Add a new task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={handleAddOrUpdate} variant="contained">
            {editId ? "Update" : "Add"}
          </Button>
        </Box>

        {filteredTodos.map((todo, index) => (
          <Box
            key={todo.id}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            border="1px solid #000"
            borderRadius={1}
            p={2}
            mb={2}
          >
            <Box display="flex" gap={2} alignItems="center" flex={1}>
              <Typography color="green" variant="h6">
                {index + 1}.
              </Typography>
              <Typography color="green" variant="h6">
                {todo.text}
              </Typography>
            </Box>
            <Box display="flex" gap={1}>
              <IconButton onClick={() => handleEdit(todo.id)}>
                <Image src={editIcon} alt="edit" width={24} height={24} />
              </IconButton>
              <IconButton onClick={() => handleDelete(todo.id)}>
                <Image src={deleteIcon} alt="delete" width={24} height={24} />
              </IconButton>
            </Box>
          </Box>
        ))}

        {filteredTodos.length === 0 && (
          <Typography color="gray" textAlign="center" mt={2}>
            No ToDo found.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
