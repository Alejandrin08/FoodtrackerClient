import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/accountService';

const useAccount = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); 

  const loginUser = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const data = await login(email, password);
      localStorage.setItem("authToken", data.token);
      setUser({ isAuthenticated: true });
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

  return { loginUser, registerUser, loading, error, user };
};

export default useAccount;
