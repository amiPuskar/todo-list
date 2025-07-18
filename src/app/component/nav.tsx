import { Box } from "@mui/material";
import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <Box py={2} px={5} bgcolor={"#202020"} display={'flex'} gap={5}>
      <Link href={"/"}>Task 1 </Link>
      <Link href={"/task2"}>Task 2 </Link>
    </Box>
  );
};

export default Nav;
