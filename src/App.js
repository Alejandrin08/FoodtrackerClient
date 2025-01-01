import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";

const App = () => {
  const [cartIsShown, setCartIsShown] = useState(false);

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
            path="/restaurants"
            element={
              <ProtectedRoute requiredRole={["ROLE_OWNER"]}>
                <Restaurants />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/error" replace />} />
        </Routes>

        <TheFooter />
      </Router>
    </CartProvider>
  );
};

export default App;
