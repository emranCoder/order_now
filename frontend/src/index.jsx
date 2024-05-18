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
import News from "./component/News";
import ViewProduct from "./Admin/pages/ViewProduct";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import Credential from "./Authentication/Credential";
import ViewCustomerDetails from "./Admin/pages/ViewCustomerDetails";
import Cookies from "js-cookie";
import Page404 from "./component/Page404";
import { Provider } from "react-redux";
import store from "./redux/store";
import AdminCredential from "./Authentication/AdminCredential";
import CouponCode from "./Admin/pages/CouponCode";
import ForgetPwd from "./Authentication/ForgetPwd";
import Message from "./Admin/pages/Message";

const token = Cookies.get("auth");

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        element={
          <Provider store={store}>
            <App />{" "}
          </Provider>
        }
      >
        <Route path="/" element={<OrderBox />} />
        <Route path="contactus" element={<ContactUs />} />
        <Route path="profile" element={(token && <Profile />) || <Page404 />} />
        <Route
          path="changepwd"
          element={(token && <ChangePwd />) || <Page404 />}
        />
        <Route path="news" element={<News />} />
        <Route path="/login" element={(!token && <Login />) || <Page404 />} />

        <Route
          path="/registration"
          element={(!token && <Register />) || <Page404 />}
        />
        <Route
          path="/credential"
          element={(!token && <Credential />) || <Page404 />}
        />
      </Route>
      <Route
        element={
          <Provider store={store}>
            <Admin />
          </Provider>
        }
      >
        <Route path="dashboard" element={<HomeInfo />} />
        <Route path="category" element={<Category />} />
        <Route path="product" element={<Product />} />
        <Route path="coupon" element={<CouponCode />} />
        <Route path="message" element={<Message />} />
        <Route path="all-order" element={<AllOrders />} />
        <Route path="current-order" element={<CurrentOrder />} />
        <Route path="payment-status" element={<PaymentStatus />} />
        <Route path="staff" element={<Staffs />} />
        <Route path="setting" element={<Setting />} />
        <Route path="user" element={<Customer />} />
        <Route path="viewproduct" element={<ViewProduct />} />
        <Route path="/view" element={<ViewCustomerDetails />} />
      </Route>
      <Route path="/admin-login" element={<AdminCredential />} />
      <Route path="/forget" element={<ForgetPwd />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
