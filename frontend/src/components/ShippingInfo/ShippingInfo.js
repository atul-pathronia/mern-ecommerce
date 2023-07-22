import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addShippingInfo } from "../../actions/cartAction";
import MetaData from "../MetaData";
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import PublicIcon from "@mui/icons-material/Public";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PhoneIcon from "@mui/icons-material/Phone";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { Country, State } from "country-state-city";
import {
  Box,
  Stack,
  Button,
  TextField,
  Paper,
  InputAdornment,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";
import CheckoutSteps from "../CheckoutSteps/CheckoutSteps";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const ShippingInfo = () => {
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleShipping = (e) => {
    e.preventDefault();
    if (phoneNo.length > 10 || phoneNo.length < 10) {
      return enqueueSnackbar("Phone number should be 10 digits", {
        variant: "error",
      });
    }

    dispatch(
      addShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/login?redirect=orderpage");
  };

  useEffect(() => {
    // if (!isAuthenticated) {
    //   navigate("/");
    // }
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#eee",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 0",
        gap: "2rem",
      }}
    >
      <CheckoutSteps activeStep={0}></CheckoutSteps>
      <MetaData title={`Urbane Man | Shipping Info`}></MetaData>
      <Box component="form" encType="multipart/form-data">
        <Paper sx={{ padding: "1rem" }}>
          <Stack gap="1rem">
            <TextField
              sx={{ outline: "none" }}
              // size="small"
              variant="outlined"
              label="Address"
              name="address"
              size="small"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              type="text"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HomeIcon></HomeIcon>
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <TextField
              sx={{ outline: "none" }}
              // size="small"
              variant="outlined"
              label="city"
              size="small"
              type="text"
              required
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationCityIcon></LocationCityIcon>
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <TextField
              variant="outlined"
              name="pincode"
              label="Pincode"
              size="small"
              type="number"
              required
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PinDropIcon></PinDropIcon>
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <TextField
              variant="outlined"
              name="phoneNo"
              label="PhoneNo"
              type="number"
              value={phoneNo}
              size="small"
              required
              onChange={(e) => setPhoneNo(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon></PhoneIcon>
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
                <PublicIcon></PublicIcon>
              </InputLabel>
              <Select
                value={country}
                required
                size="small"
                sx={{ width: "100%" }}
                onChange={(e) => setCountry(e.target.value)}
              >
                <MenuItem value="">Select Country</MenuItem>
                {Country &&
                  Country.getAllCountries().map((country) => {
                    return (
                      <MenuItem value={country.isoCode} key={country.isoCode}>
                        {country.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </Stack>

            {country && (
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
                  <TransferWithinAStationIcon></TransferWithinAStationIcon>
                </InputLabel>
                <Select
                  value={state}
                  required
                  size="small"
                  sx={{ width: "100%" }}
                  onChange={(e) => setState(e.target.value)}
                >
                  <MenuItem value="">Select State</MenuItem>
                  {State &&
                    State.getStatesOfCountry(country).map((state) => {
                      return (
                        <MenuItem value={state.isoCode} key={state.isoCode}>
                          {state.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </Stack>
            )}
            <Button
              variant="contained"
              type="submit"
              disabled={state ? false : true}
              onClick={handleShipping}
            >
              Proceed
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default ShippingInfo;
