// @packages
import React, { useState, useEffect, useMemo } from 'react';
import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify';

//@scripts
import AuthContext from '../../context/AuthContext';
import AuthPage from '../auth-page';
import Navigation from '../../routes/Navigation';
import client from '../../config/apollo/apollo';
import { decodeToken, getToken, removeToken } from '../../utils/token';

export default function App() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      setAuth(null);
    } else {
      setAuth(decodeToken(token));
    }
  }, []);

  const logout = () => {
    removeToken();
    setAuth(null);
  };

  const setUser = (user) => {
    setAuth(user);
  };

  const authData = useMemo(
    () => ({
      auth,
      logout,
      setUser
    }), [auth]
  );

  return (
    <ApolloProvider client ={client}>
      <AuthContext.Provider value={authData}>
        {!auth
          ? <AuthPage />
          : <Navigation />
        }
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop
          closeOnClick
        />
      </AuthContext.Provider>
    </ApolloProvider>
  );
}