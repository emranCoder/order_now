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
import Category from "./Admin/pages/Category";
import HomeInfo from "./Admin/pages/HomeInfo";
import Product from "./Admin/pages/Product";
import AllOrders from "./Admin/pages/AllOrders";
import CurrentOrder from "./Admin/pages/CurrentOrder";
import PaymentStatus from "./Admin/pages/PaymentStatus";
import Staffs from "./Admin/pages/Staffs";
import Setting from "./Admin/pages/Setting";
import Customer from "./Admin/pages/Customer";
import ContactUs from "./component/ContactUs";
import Profile from "./User/Profile";
import ChangePwd from "./User/ChangePwd";
import Blog from "./component/Blog";
import ViewProduct from "./Admin/pages/ViewProduct";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import Credential from "./Authentication/Credential";
import ViewCustomerDetails from "./Admin/pages/ViewCustomerDetails";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<App />}>
        <Route path="/" element={<OrderBox />} />
        <Route path="contactus" element={<ContactUs />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile" element={<Profile />} />
        <Route path="changepwd" element={<ChangePwd />} />
        <Route path="blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Register />} />
        <Route path="/credential" element={<Credential />} />
      </Route>
      <Route element={<Admin />}>
        <Route path="dashboard" element={<HomeInfo />} />
        <Route path="category" element={<Category />} />
        <Route path="Product" element={<Product />} />
        <Route path="all-order" element={<AllOrders />} />
        <Route path="current-order" element={<CurrentOrder />} />
        <Route path="payment-status" element={<PaymentStatus />} />
        <Route path="staff" element={<Staffs />} />
        <Route path="setting" element={<Setting />} />
        <Route path="user" element={<Customer />} />
        <Route path="viewproduct" element={<ViewProduct />} />
        <Route path="/view" element={<ViewCustomerDetails />} />
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
