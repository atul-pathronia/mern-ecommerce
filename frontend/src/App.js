import React, { useEffect, useState } from "react";
import "../src/App.css";
import { useNavigate, Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Loader from "./components/Loader/Loader";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import AllProducts from "./components/AllProducts/AllProducts";
import Register from "./components/Register/Register";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import store from "./store";
import { loadUser, clearErrors } from "./actions/userAction";
import axios from "axios";
import MyAccount from "./components/MyAccount/MyAccount";
import { useDispatch, useSelector } from "react-redux";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile.js";
import UpdatePassword from "./components/UpdatePassword/UpdatePassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Cart from "./components/Cart/Cart";
import ShippingInfo from "./components/ShippingInfo/ShippingInfo";
import OrderPage from "./components/OrderPage/OrderPage";
import PaymentPage from "./components/PaymentPage/PaymentPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SuccessPage from "./components/SuccessPage/SuccessPage";
import MyOrders from "./components/MyOrders/MyOrders";
import MyOrderDetails from "./components/MyOrderDetails/MyOrderDetails";
import AdminControl from "./components/admin/AdminControl";
import Error from "./components/Error/Error";
import About from "./components/About/About";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const [stripeApiKey, setStripeApiKey] = useState("");
  const { loading, isAuthenticated, user, error } = useSelector(
    (state) => state.user
  );

  // eslint-disable-next-line
  const getStripeApiKey = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/payment/sendStripeaApiKey"
      );
      setStripeApiKey(data?.data);
    } catch (error) {
      dispatch(clearErrors());
    }
  };

  useEffect(() => {
    store.dispatch(loadUser());
    // eslint-disable-next-line
    getStripeApiKey();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <BrowserRouter>
      {/* <ScrollToTop></ScrollToTop> */}
      <Header></Header>
      <Routes>
        <Route exact path="/" element={<Home></Home>} />
        <Route exact path="/products" element={<AllProducts></AllProducts>} />
        <Route exact path="/cart" element={<Cart></Cart>} />
        <Route
          exact
          path="/products/:keyword"
          element={<AllProducts></AllProducts>}
        />
        <Route
          exact
          path="/product/:id"
          element={<ProductDetails></ProductDetails>}
        />
        <Route exact path="/login" element={<Login></Login>} />
        <Route exact path="/signup" element={<Register></Register>} />
        <Route
          exact
          path="/me/password/forgot"
          element={<ForgotPassword></ForgotPassword>}
        />
        <Route
          exact
          path="/me/password/reset/:token"
          element={<ResetPassword></ResetPassword>}
        />
        <Route path="/about" exact element={<About></About>}></Route>

        {/* User log in required to access components start */}
        <Route
          exact
          path="/myaccount"
          element={<MyAccount isAuthenticated={isAuthenticated}></MyAccount>}
        />
        <Route
          exact
          path="/me/update"
          element={
            <UpdateProfile isAuthenticated={isAuthenticated}></UpdateProfile>
          }
        />
        <Route
          exact
          path="/me/password/update"
          element={
            <UpdatePassword isAuthenticated={isAuthenticated}></UpdatePassword>
          }
        />
        <Route exact path="/shipping" element={<ShippingInfo></ShippingInfo>} />
        <Route exact path="/orderpage" element={<OrderPage></OrderPage>} />
        <Route
          exact
          path="/process/payment"
          element={
            stripeApiKey && (
              <Elements stripe={stripeApiKey && loadStripe(stripeApiKey)}>
                <PaymentPage></PaymentPage>
              </Elements>
            )
          }
        />
        <Route
          exact
          path="/success"
          element={
            <SuccessPage isAuthenticated={isAuthenticated}></SuccessPage>
          }
        ></Route>
        <Route
          exact
          path="/myOrders"
          element={<MyOrders isAuthenticated={isAuthenticated}></MyOrders>}
        ></Route>
        <Route
          exact
          path="/order/:id"
          element={
            <MyOrderDetails isAuthenticated={isAuthenticated}></MyOrderDetails>
          }
        ></Route>
        <Route
          exact
          path="myaccount/admin/control"
          element={<AdminControl isAuthenticated={isAuthenticated} />}
        ></Route>
        {/* User log in required to access components end */}

        <Route path="*" element={<Error></Error>}></Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;