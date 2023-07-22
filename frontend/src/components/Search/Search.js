import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Box, Stack, TextField, Button } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MetaData from "../MetaData";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

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
      sx={{
        width: { xs: "100%", md: "auto" },
        margin: { xs: "1rem auto" },
        backgroundColor: "white",
      }}
    >
      <Box
        component="form"
        className="search"
        onSubmit={handleSearch}
        sx={{ marginTop: { xs: "1rem", md: "0" } }}
      >
        <MetaData title={`Urbane Man | Search Page`}></MetaData>
        <TextField
          type="text"
          sx={{
            padding: 0,
            border: "none",
            width: "100%",
            // margin: "0 auto",
          }}
          placeholder="search a product"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          size="small"
        ></TextField>
      </Box>
    </Box>
  );
};

export default Search;
