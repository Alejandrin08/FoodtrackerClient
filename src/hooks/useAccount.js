  import { useState, useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { login, register, validateEmail, updatePassword } from "../services/accountService";
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
        localStorage.setItem("userId", data.id);
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

    return {
      loginUser,
      registerUser,
      validateUserEmail,
      changeUserPassword,
      loading,
      error,
      user,
    };
  };

  export default useAccount;
