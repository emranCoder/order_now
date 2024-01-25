import React from "react";
import Header from "./Header";
import SideMenu from "./SideMenu";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import HomeInfo from "./HomeInfo";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
  padding: 0,
  margin: 0,
}));

export default function Admin() {
  return (
    <div>
      <Header />
      <Grid container spacing={0} padding={0} margin={0}>
        <Grid item xs={3}>
          <Item>
            <SideMenu />
          </Item>
        </Grid>
        <Grid item xs={9}>
          <Item>
            <HomeInfo />
          </Item>
        </Grid>
      </Grid>
    </div>
  );
}
