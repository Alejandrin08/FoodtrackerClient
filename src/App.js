import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";
import TheNav from "./components/Header/TheNav";
import Sections from "./components/Sections/Sections";
import Cart from "./components/Cart/Cart";
import CartProvider from "./components/store/CartProvider";
import TheFooter from "./components/Footer/TheFooter";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/Login/ProtectedRoute";
import SignUpOne from "./components/SignUp/SignUpOne";
import SignUpTwo from "./components/SignUp/SignUpTwo";
import Error from "./components/Error/Error";
import EditProfile from "./components/EditProfile/EditProfile";
import Restaurants from "./components/Restaurants/Restaurants";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Menu from "./components/Menu/Menu"
import Order from "./components/Order/Order"
import EditRestaurant from "./components/EditRestaurant/EditRestaurant";
import Swal from "sweetalert2";
import RegisterRestaurant from "./components/RegisterRestaurant/RegisterRestaurant";
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterMenu from "./components/RegisterMenu/RegisterMenu";
import EditMenu from "./components/EditMenu/EditMenu"

const App = () => {
  const [cartIsShown, setCartIsShown] = useState(false);
  const googleMapsLibraries = ['places'];

  const onShowCartHandler = () => {
    setCartIsShown(true);
  };

  const onCloseCartHandler = () => {
    setCartIsShown(false);
  };

  const onOrderHandler = () => {
    setCartIsShown(false);

    Swal.fire({
      title: "Successful!",
      text: "Your order is on the way",
      icon: "success",
    });
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={googleMapsLibraries}
    >
      <CartProvider>
        <Router>
          {cartIsShown && (
            <Cart onCloseCart={onCloseCartHandler} onOrder={onOrderHandler} />
          )}

          <TheNav onShowCart={onShowCartHandler} />

          <Routes>
            <Route path="/" element={<Sections />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUpOne />} />
            <Route path="/signup/:id" element={<SignUpTwo />} />
            <Route path="/error" element={<Error />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute requiredRole={["ROLE_OWNER", "ROLE_CLIENT"]}>
                  <EditProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register-menu"
              element={
                <ProtectedRoute requiredRole={["ROLE_OWNER"]}>
                  <RegisterMenu />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-menu"
              element={
                <ProtectedRoute requiredRole={["ROLE_OWNER"]}>
                  <EditMenu />
                </ProtectedRoute>
              }
            />
            <Route
              path="/restaurants"
              element={
                <ProtectedRoute requiredRole={["ROLE_OWNER", "ROLE_CLIENT"]}>
                  <Restaurants />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register-restaurant"
              element={
                <ProtectedRoute requiredRole={["ROLE_CLIENT"]}>
                  <RegisterRestaurant />
                </ProtectedRoute>
              }
            />            
            <Route
              path="/menu"
              element={
                <ProtectedRoute requiredRole={["ROLE_OWNER", "ROLE_CLIENT"]}>
                  <Menu />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order"
              element={
                <ProtectedRoute requiredRole={["ROLE_OWNER", "ROLE_CLIENT"]}>
                  <Order />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-restaurant"
              element={
                <ProtectedRoute requiredRole={["ROLE_OWNER"]}>
                  <EditRestaurant />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/error" replace />} />
          </Routes>

          <TheFooter />
        </Router>
      </CartProvider>
    </LoadScript>
  );
};

export default App;
