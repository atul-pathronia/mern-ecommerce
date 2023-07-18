import React from "react";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import { Box, Typography } from "@mui/material";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "row", md: "column" },
        // alignItems: { xs: "center", md: "normal" },
        justifyContent: { xs: "center", md: "flex-start" },
        gap: "1rem",
        flexWrap: "wrap",
      }}
    >
      {/* <Link to="/">
        <Stack sx={{ backgroundColor: "primary.main", padding: "1rem" }}>
          <Typography>SupplyShore</Typography>
        </Stack>
      </Link> */}
      {/* <Link to="/myaccount/admin/dashboard"> */}
      <Typography
        sx={{
          color: "primary.main",
          display: "flex",
          alignItems: "center",
          gap: ".5rem",
          padding: ".5rem",
          "&:hover": {
            backgroundColor: "primary.main",
            color: "white",
            transition: "all .3s",
          },
        }}
      >
        <DashboardIcon></DashboardIcon>
        Dashboard
      </Typography>
      {/* </Link> */}
      {/* <Link> */}
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon></ExpandMoreIcon>}
        defaultExpandIcon={<ImportExportIcon />}
        sx={{
          color: "primary.main",
          padding: ".5rem",
          "&:hover": {
            backgroundColor: "primary.light",
            color: "white",
            transition: "all .3s",
          },
        }}
      >
        <TreeItem nodeId="1" label="Products">
          {/* <Link to="/myaccount/admin/products"> */}
          <Typography
            sx={{
              color: "primary.main",
              padding: ".5rem",
              "&:hover": {
                color: "white",
                transition: "all .3s",
              },
            }}
          >
            <TreeItem nodeId="2" label="All" icon={<PostAddIcon />}></TreeItem>
          </Typography>
          {/* </Link> */}
          {/* <Link to="/myaccount/admin/create"> */}
          <Typography
            sx={{
              color: "primary.main",
              padding: ".5rem",
              "&:hover": {
                color: "white",
                transition: "all .3s",
              },
            }}
          >
            <TreeItem nodeId="3" label="Create" icon={<AddIcon />}></TreeItem>
          </Typography>
          {/* </Link> */}
        </TreeItem>
      </TreeView>
      {/* </Link> */}
      {/* <Link to="/myaccount/admin/orders"> */}
      <Typography
        sx={{
          color: "primary.main",
          gap: ".5rem",
          display: "flex",
          padding: ".5rem",
          "&:hover": {
            backgroundColor: "primary.main",
            color: "white",
            transition: "all 1s",
          },
          alignItems: "center",
        }}
      >
        <ListAltIcon></ListAltIcon>
        Orders
      </Typography>
      {/* </Link> */}
      {/* <Link to="/myaccount/admin/users"> */}
      <Typography
        sx={{
          color: "primary.main",
          padding: ".5rem",
          display: "flex",
          alignItems: "center",
          gap: ".5rem",
          "&:hover": {
            backgroundColor: "primary.main",
            color: "white",
            transition: "all 1s",
          },
        }}
      >
        <PeopleIcon></PeopleIcon>
        Users
      </Typography>
      {/* </Link> */}
      {/* <Link to="/myaccount/admin/reviews"> */}
      {/* <Typography
        sx={{
          color: "primary.main",
          padding: ".5rem",
          display: "flex",
          alignItems: "center",
          gap: ".5rem",
          "&:hover": {
            backgroundColor: "primary.main",
            color: "white",
            transition: "all 1s",
          },
        }}
      >
        <RateReviewIcon></RateReviewIcon>
        Reviews
      </Typography> */}
      {/* </Link> */}
    </Box>
  );
};

export default Sidebar;
