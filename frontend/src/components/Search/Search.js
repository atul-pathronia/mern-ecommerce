import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Box, Stack, TextField, Button } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MetaData from "../MetaData";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  // const { searchTerm } = useParams();
  // console.log(searchTerm);

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate(`/products`);
    }
  };

  return (
    <Box
      component="form"
      className="search"
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "auto",
        backgroundColor: "white",
      }}
    >
      <MetaData title={`Urbane Man | Search Page`}></MetaData>
      <TextField
        type="text"
        sx={{
          padding: 0,
          border: "none",
          width: "90%",
          margin: "0 auto",
        }}
        placeholder="search a product"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        size="small"
      ></TextField>
      <Button type="submit" onClick={handleSearch}>
        <SearchOutlinedIcon
          sx={{ color: "#1976d2", cursor: "pointer" }}
        ></SearchOutlinedIcon>
      </Button>
    </Box>
  );
};

export default Search;
