// src/hooks/useUserData.js
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getUserPreferences, updateGroceryItem } from '../service/firebase/firestore';

export const useUserData = () => {
  const { user } = useAuth0();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const data = await getUserPreferences(user.sub);
      setUserData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleGroceryItem = async (itemId, checked) => {
    try {
      await updateGroceryItem(user.sub, itemId, checked);
      // Refresh data after update
      fetchUserData();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (user?.sub) {
      fetchUserData();
    }
  }, [user]);

  return { 
    userData, 
    loading, 
    error,
    toggleGroceryItem,
    refreshData: fetchUserData 
  };
};