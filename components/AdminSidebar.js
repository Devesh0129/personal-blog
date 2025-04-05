import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Drawer,
  Box,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router"; // Using Next.js's built-in router

const AdminSidebar = () => {
  const router = useRouter(); // Next.js router
  const { pathname } = router; // Get the current pathname from Next.js router

  // Function to navigate to different admin pages
  const handleNavigation = (route) => {
    router.push(route); // Using Next.js router to navigate to the route
  };

  // Function to apply active link styling
  const getListItemClass = (route) => {
    return pathname === route ? "active" : "";
  };

  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Admin Panel
        </Typography>
      </Box>
      <Divider />
      <List>
        {/* Dashboard Route */}
        <ListItem
          button
          sx={{
            backgroundColor: pathname === "/admin" ? "#1976d2" : "transparent", // Highlight active
            color: pathname === "/admin" ? "white" : "inherit", // Change text color
          }}
          className={getListItemClass("/admin")} // Highlight active link
          onClick={() => handleNavigation("/admin")}
        >
          <ListItemText primary="Dashboard" />
        </ListItem>

        {/* Create Post Route */}
        <ListItem
          button
          sx={{
            backgroundColor: pathname === "/admin/create-post" ? "#1976d2" : "transparent", // Highlight active
            color: pathname === "/admin/create-post" ? "white" : "inherit", // Change text color
          }}
          className={getListItemClass("/admin/create-post")} // Highlight active link
          onClick={() => handleNavigation("/admin/create-post")}
        >
          <ListItemText primary="Create Post" />
        </ListItem>

        {/* Users Route */}
        {/* <ListItem
          button
          className={getListItemClass("/admin/users")} // Highlight active link
          onClick={() => handleNavigation("/admin/users")}
        >
          <ListItemText primary="Users" />
        </ListItem> */}
      </List>
    </Drawer>
  );
};

export default AdminSidebar;
