import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  Typography,
  TextField,
  Stack,
  InputAdornment,
  Select,
  MenuItem,
  InputLabel,
  Paper,
} from "@mui/material";
import { clearErrors, createProductAdmin } from "../../actions/productActions";
import { ADMIN_PRODUCT_CREATE_RESET } from "../../constants/productConstant";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import "./CreateProduct.css";

const categories = ["T-shirts", "Shirts", "Jeans", "Pants", "Shoes"];

const CreateProduct = ({ setShowCreateProduct, setShowDashboard }) => {
  const dispatch = useDispatch();
  const { loading, error, status } = useSelector((state) => state.newProduct);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreivew] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    if (status) {
      enqueueSnackbar("Product created successfully", { variant: "success" });
      navigate("/myaccount/admin/control");
      dispatch({ type: ADMIN_PRODUCT_CREATE_RESET });
      setShowCreateProduct(false);
      setShowDashboard(true);
    }
  }, [
    dispatch,
    status,
    error,
    enqueueSnackbar,
    navigate,
    setShowCreateProduct,
    setShowDashboard,
  ]);

  const handleCreateProduct = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("stock", stock);
    myForm.set("description", description);
    myForm.set("category", category);
    console.log(images);
    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProductAdmin(myForm));
  };

  const handleCreateProductImagesOnChange = (e) => {
    // e.preventDefault();
    const files = Array.from(e.target.files);

    console.log(files);
    setImages([]);
    setImagesPreivew([]);
    console.log(images);
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreivew((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Box sx={{ backgroundColor: "#f7f7f7", width: "100%", padding: "1rem" }}>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeigh: "bold",
          marginBottom: "1rem",
        }}
      >
        Create Product
      </Typography>
      <Box
        component="form"
        encType="multipart/form-data"
        sx={{
          width: { xs: "95%", sm: "90%", md: "40%" },
          margin: "0 auto",
        }}
      >
        <Paper sx={{ padding: "1rem" }}>
          <Stack gap="1rem">
            <TextField
              sx={{ outline: "none" }}
              // size="small"
              variant="outlined"
              label="Product Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SpellcheckIcon></SpellcheckIcon>
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <TextField
              sx={{ outline: "none" }}
              // size="small"
              variant="outlined"
              label="Price"
              type="number"
              placeholder="Price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyIcon></AttachMoneyIcon>
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <Stack
              sx={{
                width: "100%",
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
              }}
            >
              <DescriptionIcon></DescriptionIcon>
              <textarea
                className="textareawidth"
                name="description"
                label="Description"
                cols={30}
                rows={2}
                placeholder="Write Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </Stack>
            <TextField
              variant="outlined"
              name="stock"
              label="Stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <StorageIcon></StorageIcon>
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "0.5rem",
                alignItems: "center",
                width: "100%",
              }}
            >
              <InputLabel>
                <AccountTreeIcon></AccountTreeIcon>
              </InputLabel>
              <Select
                value={category}
                required
                size="small"
                sx={{ width: "100%" }}
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="">Select Category</MenuItem>
                {categories.map((category, index) => {
                  return (
                    <MenuItem value={category} key={category}>
                      {category}
                    </MenuItem>
                  );
                })}
              </Select>
            </Stack>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                alignItems: "center",
              }}
            >
              <Stack
                sx={{
                  position: "relative",
                  width: "100%",
                  padding: "1rem 0",
                }}
              >
                <input
                  name="productPhotos"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleCreateProductImagesOnChange}
                ></input>
              </Stack>
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  gap: "0.5rem",
                  overflowX: "auto",
                  width: "100%",
                }}
              >
                {imagesPreview.map((image, index) => {
                  return (
                    <img
                      src={image}
                      key={index}
                      alt="Avatar Preview"
                      className="productPhotos"
                    />
                  );
                })}
              </Stack>
            </Stack>

            <Button
              variant="contained"
              type="submit"
              disabled={loading ? true : false}
              onClick={handleCreateProduct}
            >
              {loading ? <CircularProgress /> : "Create"}
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default CreateProduct;
