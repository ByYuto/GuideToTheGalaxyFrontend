import { useState, useEffect } from 'react';

export const useAuth = () => {
  const token = window.localStorage.getItem('_token');
  const authentication = token === null ? false : true;
  const [auth, setAuthentication] = useState(authentication);
  useEffect(() => {
    window.addEventListener('storage', () => {
      const token = window.localStorage.getItem('_token');
      const auth = token === null ? false : true;
      console.log('trigger storage event');
      setAuthentication(auth);
    });
  }, []);
  return auth;
};
