"use client";

import { Box, Typography } from "@mui/material";
import Link from "next/link";
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

      <Box p={10}>
        <Typography color="#000" variant="h6">
          User List
        </Typography>
        <input
          type="text"
          placeholder="Search users..."
          value={filter}
          onChange={handleSearch}
          style={{
            margin: "16px 0",
            padding: "8px",
            width: "100%",
            color: "#000",
            border: "1px solid",
          }}
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
