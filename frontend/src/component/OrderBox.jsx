import React from "react";
import FoodItem from "./FoodItem";
import OrderMenuBox from "./OrderMenuBox";
import { Grid, Container } from "@mui/material";
import FooterMenu from "./FooterMenu";

export default function OrderBox() {
  return (
    <div>
      <Container className="bg-white rounded-xl p-0" sx={{ flexGrow: 1 }}>
        <Grid
          container
          direction={"row"}
          justifyContent={"center"}
          className="mt-5"
          padding={0}
          showLabel
        >
          <Grid item lg={3} md={3}>
            <OrderMenuBox />
          </Grid>
          <Grid item lg={9} md={9}>
            <FoodItem />
          </Grid>
        </Grid>
      </Container>
      <FooterMenu />
    </div>
  );
}
