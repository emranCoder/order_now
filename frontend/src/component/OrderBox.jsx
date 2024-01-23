import React from "react";
import FoodItem from "./FoodItem";
import OrderMenuBox from "./OrderMenuBox";
import { Grid, Container } from "@mui/material";
import FooterMenu from "./FooterMenu";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));

export default function OrderBox() {
  return (
    <div>
      <Container className="bg-white rounded-xl p-0" sx={{ flexGrow: 1 }}>
        <Grid
          container
          direction={"row"}
          justifyContent={"center"}
          className="mt-5"
        >
          {/* <Grid item lg={3} md={3}> */}
          <Grid item xs={3}>
            <Item>
              <OrderMenuBox />
            </Item>
          </Grid>
          {/* <Grid item lg={9} md={9}> */}
          <Grid item xs={9}>
            <Item>
              {" "}
              <FoodItem />
            </Item>
          </Grid>
        </Grid>
      </Container>
      <FooterMenu />
    </div>
  );
}
