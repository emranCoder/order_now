import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import OrderBox from "./component/OrderBox";
import Admin from "./Admin/Admin";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AddCategory from "./Admin/pages/AddCategory";
import HomeInfo from "./Admin/HomeInfo";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />}>
        <Route index element={<OrderBox />} />
      </Route>
      <Route path="/dashboard" element={<Admin />}>
        <Route path="/dashboard" element={<HomeInfo />} />
        <Route path="category" element={<AddCategory />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
