import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register, validateEmail, updatePassword, updateEmail, getAccount } from "../services/accountService";
import { jwtDecode } from 'jwt-decode';

const useAccount = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        if (decodedToken.exp * 1000 > Date.now()) {
          setUser({
            isAuthenticated: true,
            role: decodedToken.roles,
          });
        } else {
          localStorage.removeItem("authToken");
        }
      } catch (err) {
        localStorage.removeItem("authToken");
      }
    } setLoading(false);
  }, []);

  const loginUser = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const data = await login(email, password);
      localStorage.setItem("authToken", data.token);

      const decodedToken = jwtDecode(data.token);

      setUser({
        isAuthenticated: true,
        role: decodedToken.roles,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const data = await register(email, password);
      setUser({ id: data.id });
      navigate(`/signup/${data.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const validateUserEmail = async (email) => {
    setLoading(true);
    setError(null);

    try {
      const isValid = await validateEmail(email);
      return isValid;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const changeUserPassword = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const isUpdated = await updatePassword(email, password);
      navigate(`/login`);
      return isUpdated;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const changeUserEmail = async (email) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("El usuario no está autenticado");
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      if (!userId) {
        throw new Error("No se pudo obtener el ID del usuario del token");
      }

      const response = await updateEmail(userId, email);

      if (!response?.updated) {
        throw new Error("Error al actualizar el correo electrónico");
      }

      if (response.newToken) {
        localStorage.setItem("authToken", response.newToken);
      }

      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getUser = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const user = await getAccount(id);
      return user;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loginUser,
    registerUser,
    validateUserEmail,
    changeUserPassword,
    changeUserEmail,
    getUser,
    loading,
    error,
    user,
  };
};

export default useAccount;
