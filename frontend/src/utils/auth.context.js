import React, { createContext, useEffect, useState } from 'react';
import http from './http.common';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState({
    user: null,
    verified: false,
    isVerifying: true,
  });

  async function authUser() {
    console.log('authUser() called');
    setUser((currentState) => {
      let result = currentState;
      result.isVerifying = true;
      return result;
    });

    const userLocal = localStorage.getItem('user');

    if (!userLocal) {
      // No storage exists
      setUser({
        user: null,
        verified: false,
        isVerifying: false,
      });
    } else {
      // Storage exists
      const userLocalJSON = JSON.parse(userLocal);
      const verifyResponse = await verifyToken(userLocalJSON);

      setUser({
        user: userLocalJSON,
        verified: verifyResponse,
        isVerifying: false,
      });
    }
    console.log('authUser() finished');
  }

  //useEffect(() => {
  //    console.log('Is verifying: ' + user.isVerifying);
  //}, [user])

  async function verifyToken(userJSON) {
    try {
      setUser({ user: null, verified: false, isVerifying: true });
      const header = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const payload = {
        token: userJSON.token,
      };

      const response = await http.post('api/v1/user/verify', payload, header);

      if (response.status === 200) {
        console.log(
          'Identity confirmed. Server response: ' + response.data.identity
        );
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log('Error: ' + e);
      return false;
    }
  }

  useEffect(() => {
    authUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ user, authUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthProvider };
