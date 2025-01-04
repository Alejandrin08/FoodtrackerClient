import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerClient, getClient, updateClient } from '../services/clientService';

const useClient = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [client, setClient] = useState(null);
  const navigate = useNavigate();

  const registerClientData = async (id, name, phone) => {
    setLoading(true);
    setError(null);

    try {
      const data = await registerClient(id, name, phone);
      setClient(data);
      navigate(`/login`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getClientData = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getClient(id);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateClientData = async (id, name, phone) => {
    setLoading(true);
    setError(null);

    try {
      const data = await updateClient(id, name, phone);
      setClient(data); 
      return true; 
    } catch (err) {
      setError(err.message);
      return false; 
    } finally {
      setLoading(false);
    }
  };

  return {
    registerClientData,
    getClientData,
    updateClientData,
    loading,
    error,
    client,
  };
};

export default useClient;
