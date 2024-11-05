import { Form, Input } from "antd";
import React, { useState } from "react";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../AuthContext";

export const AdminLoginPage = () => {
  const { Login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { userName: initialUserName } = location.state || {};

  const [userName, setUserName] = useState(initialUserName || '');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    Login(userName, password)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error("Giriş xətası: ", error);
      });
  };

  return (
    <div className="container h-100vh d-flex align-items-center justify-content-center">
      <div className="myRow flex-column">
        <span className="tc-0F">E-legal</span>
        <span className="tc-B5 mt-2">Admin Panel</span>

        <Form
          layout="vertical"
          onFinish={handleLogin}
          className="product-search-form"
        >
          <div className="mt-4">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Geçerli bir e-posta adresi giriniz!",
                },
                {
                  required: true,
                  message: "Lütfen e-posta adresinizi giriniz!",
                },
              ]}
            >
              <Input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="example@gmail.com"
              />
            </Form.Item>
          </div>
          <div className="mt-3">
            <Form.Item
              label="Şifrə"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Lütfen şifrenizi giriniz!",
                },
              ]}
            >
              <Input.Password
                placeholder="Şifrə daxil edin"
                onChange={(e) => setPassword(e.target.value)}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
          </div>
          <button type="submit" className="AdminloginButton">
            Daxil ol
          </button>
        </Form>
      </div>
    </div>
  );
};
