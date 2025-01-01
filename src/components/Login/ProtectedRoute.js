import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, requiredRole }) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        const decodedToken = jwtDecode(token);

        const userRole = decodedToken.roles; 
        if (requiredRole.includes(userRole)) {
            return children;
        } else {
            return <Navigate to="/error" replace />;
        }
    } catch (error) {
        return <Navigate to="/login" replace />;
    }
};

export default ProtectedRoute;
