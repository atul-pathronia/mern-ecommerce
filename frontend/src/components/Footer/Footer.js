import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { AiFillFacebook } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import { FiTwitter } from "react-icons/fi";
import { FaPinterestP } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <Box
      sx={{
        marginTop: "1rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#1976d2",
        alignItems: "flex-start",
        padding: "1rem .2rem",
        flexWrap: "wrap",
        color: "white",
      }}
    >
      <Stack sx={{ textAlign: "center" }}>
        <h3>SupplyShore</h3>
        <Stack
          sx={{
            fontSize: "1.5rem",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <AiFillFacebook></AiFillFacebook>
          <AiOutlineInstagram></AiOutlineInstagram>
          <FiTwitter></FiTwitter>
          <FaPinterestP></FaPinterestP>
        </Stack>
      </Stack>
      <Stack sx={{ gap: ".5rem", cursor: "pointer" }}>
        <h3>Information Company</h3>
        <Typography>My Account</Typography>
        <Typography>Track Your Order</Typography>
        <Typography>FAQs</Typography>
        <Typography>Payment Methods </Typography>
        <Typography>Shipping Guide </Typography>
        <Typography>Products Support </Typography>
        <Typography>Gift Card Balance </Typography>
      </Stack>
      <Stack sx={{ gap: ".5rem", cursor: "pointer" }}>
        <h3>More From SupplyShore</h3>
        <Typography>Abour Supplyshore</Typography>
        <Typography>Our Guarantee</Typography>
        <Typography>Terms and conditions</Typography>
        <Typography>Privacy Policy </Typography>
        <Typography>Return Policy </Typography>
        <Typography>Delivery & Return </Typography>
        <Typography>Sitemap </Typography>
      </Stack>
      <Stack sx={{ gap: ".5rem" }}>
        <h3>Let's Talk</h3>
        <Typography>
          <HeadphonesOutlinedIcon></HeadphonesOutlinedIcon> +391 (0)35 2568 4593
        </Typography>
        <Typography>
          <EmailOutlinedIcon></EmailOutlinedIcon> hello@domain.com
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;
