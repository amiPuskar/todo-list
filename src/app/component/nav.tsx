"use client";
import { Box } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Nav = () => {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "ToDo list (Task 1)" },
    { href: "/task2", label: "Debugging Code User list (Task 2)" },
    { href: "/task3", label: "Debounced Input example (Task 3)" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <Box
      py={2}
      px={{ xs: 2, md: 5 }}
      bgcolor={"#202020"}
      display={"flex"}
      flexDirection={{ xs: "column", md: "row" }}
      gap={{ xs: 2, md: 5 }}
    >
      {links.map((link) => (
        <Link key={link.href} href={link.href} passHref>
          <Box
            bgcolor={isActive(link.href) ? "#1976d2" : "#FFF"}
            px={2}
            py={0.5}
            borderRadius={1}
            color={isActive(link.href) ? "#FFF" : "blue"}
          >
            {link.label}
          </Box>
        </Link>
      ))}
    </Box>
  );
};

export default Nav;
