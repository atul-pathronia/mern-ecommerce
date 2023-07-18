import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import MetaData from "../MetaData";
import "./About.css";

const About = () => {
  return (
    <>
      <MetaData title={`Urbane Man | About Us`}></MetaData>
      <Box
        sx={{
          maxWidth: { xs: "90%", md: "75%" },
          margin: "1rem auto",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "2rem",
            marginBottom: "1.5rem",
            color: "#333",
          }}
        >
          How it all began
        </Typography>

        <Stack
          sx={{
            display: "flex",
            gap: "1.5rem",
          }}
        >
          <Typography>
            In a world where fashion reigns supreme, a group of friends came
            together with a shared passion for men's style and a desire to
            create something extraordinary. Thus, our menswear store was born—a
            place where refined fashion meets contemporary trends.
          </Typography>
          <Typography>
            Our journey began with a simple vision: to offer gentlemen a curated
            collection that combines timeless elegance with modern flair. We
            meticulously handpick each garment, sourcing only the finest fabrics
            and materials from trusted suppliers around the world. Our
            dedication to quality ensures that every piece embodies the highest
            standards of craftsmanship.
          </Typography>
          <Typography>
            But our store is more than just clothing; it is a sanctuary for
            those seeking a distinct sense of style. We believe that fashion is
            an expression of individuality, and we strive to provide a platform
            for gentlemen to explore their unique tastes. Our team of fashion
            experts is always ready to offer personalized advice and guidance,
            helping our customers create looks that reflect their personality
            and enhance their confidence.
          </Typography>
          <Typography>
            Over time, we have fostered a community of like-minded individuals
            who share our passion for elevated style. We cherish the
            relationships we have built with our customers and take pride in
            being a part of their fashion journeys. Their trust and loyalty are
            the driving forces behind our continuous pursuit of excellence.
          </Typography>
          <Typography>
            As our store grows, we remain committed to providing an exceptional
            shopping experience. From seamless online browsing to efficient
            customer support, we strive to exceed expectations at every step. We
            want our customers to feel a sense of delight and satisfaction when
            they choose to shop with us.
          </Typography>
          <Typography>
            So, welcome to our world—a place where fashion dreams become a
            reality. Explore our carefully curated collection, immerse yourself
            in the latest trends, and discover the perfect pieces to elevate
            your wardrobe. Join us as we redefine men's fashion, one garment at
            a time.
          </Typography>
        </Stack>
      </Box>
    </>
  );
};

export default About;
