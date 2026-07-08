import React, { createContext, useState, useEffect, useContext } from 'react';
import { login as loginApi, signup as signupApi, getMe } from '../services/auth';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      getMe()
        .then(res => setUser(res.data))
        .catch(() => {
          localStorage.removeItem('access_token');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await loginApi({ email, password });
      localStorage.setItem('access_token', res.data.access_token);
      const me = await getMe();
      setUser(me.data);
      toast.success('Logged in successfully');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Login failed');
      return false;
    }
  };

  const signup = async (name, email, password) => {
    try {
      await signupApi({ name, email, password });
      toast.success('Account created. Please log in.');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Signup failed');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
    toast.success('Logged out');
  };

  const value = { user, loading, login, signup, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);