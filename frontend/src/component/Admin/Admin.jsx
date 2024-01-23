import React from "react";
import Header from "./Header";
import SideMenu from "./SideMenu";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));

export default function Admin() {
  return (
    <div>
      <Header />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Item>
              <SideMenu />
            </Item>
          </Grid>
          <Grid item xs={9}>
            <Item></Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
