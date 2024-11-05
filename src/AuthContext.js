import React, { createContext, useState, useContext, useEffect } from 'react';
import { AccountApi } from "./Api/account.api.js";
import { notification } from 'antd';
import { jwtDecode } from 'jwt-decode'; // JWT'yi çözümlemek için

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Başlangıçta yükleniyor
  const [loginLoading, setLoginLoading] = useState(false);

  const openNotification = (message, description, error) => {
    if (error) {
      notification.error({
        message,
        description,
        placement: 'topRight'
      });
    } else {
      notification.success({ // Notification success olarak değiştirildi
        message,
        description,
        placement: 'topRight'
      });
    }
  };

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('loggedIn');
    if (storedLoggedIn) {
      setLoggedIn(JSON.parse(storedLoggedIn));
    } else {
      setLoggedIn(false);
    }
    setLoading(false);
  }, []);

  const Login = (userName, password) => {
    setLoginLoading(true);

    return AccountApi.Login({ userName, password })
      .then((res) => {
        console.log(res);
        const token = res.token;
        localStorage.setItem('token', token);

        // Token'dan kullanıcı bilgilerini çözümleyin
        const decodedToken = jwtDecode(token);
        const roles = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        // Roller kontrolü
        if (roles && (roles.includes("Admin") || roles.includes("MasterAdmin"))) {
          setLoggedIn(true);
          localStorage.setItem('loggedIn', true);
          openNotification('Uğurlu Giriş!', 'Admin panele giriş etdiniz!', false);
        } else {
          setLoggedIn(false);
          openNotification('Giriş Qadağan edildi!', 'Sizin rolunuz catmir!', true);
        }
      })
      .catch((error) => {
        setLoggedIn(false);
        openNotification('Xəta baş verdi', error.response?.data?.message || 'Bilinməyən xəta', true);
      })
      .finally(() => {
        setLoginLoading(false);
      });
  };

  const logout = () => {
    setLoggedIn(false);
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('token'); // Token'i de sil
  };

  return (
    <AuthContext.Provider value={{ loggedIn, loading, loginLoading, Login, logout, openNotification }}>
      {children}
    </AuthContext.Provider>
  );
};
