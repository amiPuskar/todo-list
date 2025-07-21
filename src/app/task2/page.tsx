"use client";

import { Box, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Nav from "../component/nav";

type User = {
  id: number;
  name: string;
  [key: string]: any;
};

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user: any) =>
        user.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, users]);

  const fetchUsers = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    setUsers(data);
  };

  const handleSearch = (e: any) => {
    setFilter(e.target.value);
  };

  console.log(filteredUsers, "filteredUsers");
  return (
    <Box>
      <Nav />

      <Box p={4} maxWidth={600} mx="auto">
        <Typography variant="h4" color="#000" mb={2}>
          Debugging Code User list
        </Typography>

        <TextField
          label="Search Users"
          variant="outlined"
          fullWidth
          value={filter}
          onChange={handleSearch}
          sx={{ mb: 2 }}
        />
        <Box>
          {filteredUsers.length === 0 ? (
            <Typography color="#888">User not found</Typography>
          ) : (
            filteredUsers.map((user) => (
              <Typography color="#000" key={user.id}>
                {user.name}
              </Typography>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default UserList;
