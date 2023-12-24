import * as React from "react";
import "./App.css";
import NavBar from "./component/NavBar";
import { Box } from "@mui/material";
import OrderBox from "./component/OrderBox";

function App() {
  return (
    <Box className="bg-rose-300 h-screen" sx={{ flexGrow: 1 }}>
      <NavBar />
      <OrderBox />
    </Box>
  );
}

export default App;
