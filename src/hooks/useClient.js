import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerClient } from '../services/clientService';

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

  return { registerClientData, loading, error, client };
};

export default useClient;
