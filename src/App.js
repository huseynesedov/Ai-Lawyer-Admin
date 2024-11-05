import React from 'react';
import { Spin } from 'antd'

import { AuthProvider, useAuth } from './AuthContext';


import { AdminLoginPage } from './Components/Pages/Login';
import RouteList from './Components/Layout/Routes';
import Layout from './Components/Layout/MainLayout';


function App() {
  const { loggedIn, loginLoading } = useAuth();


  return (
    <>
      {loggedIn ? (
        <Layout>
          <RouteList />
        </Layout>
      ) : (
        <Spin spinning={loginLoading} tip="Loading...">
          <AdminLoginPage />
        </Spin>
      )}
    </>
  );
}

export default function WrappedApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}