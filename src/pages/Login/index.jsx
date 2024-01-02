import className from "classnames/bind";
import styles from "./Login.module.scss";
const cx = className.bind(styles);

import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useGoogleLogin } from "@react-oauth/google";

function LoginPage() {
  const onFinish = (values) => {
    // Khi nhấn nút submit thì nó chạy vô đây
    console.log("Success:", values);
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });

  return (
    <div className={cx("wrapper")}>
      <div className={cx("row border m-auto", "framLogin")}>
        <div className={cx("col-lg")}>
          <div className={cx("bgLogin", "w-100 h-100")}></div>
        </div>
        <div className={cx("col-lg-8  d-flex align-items-center")}>
          <div
            className={cx("border")}
            style={{ minWidth: 500, margin: "0 auto" }}
          >
            <h2 className={cx("py-3 text-center")}>Đăng nhập</h2>
            <div>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  const decoded = jwtDecode(credentialResponse.credential);

                  console.log("decoded", decoded);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
              {/* <button className={cx('btn btn-primary')} onClick={() => login()}>
                Sign in with Google 🚀
              </button> */}
              ;
            </div>
            <Form
              name="normal_login"
              className={cx("login-form")}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your Username!",
                  },
                ]}
              >
                <Input
                  prefix={
                    <UserOutlined className={cx("site-form-item-icon")} />
                  }
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  prefix={
                    <LockOutlined className={cx("site-form-item-icon")} />
                  }
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className={cx("login-form-forgot")} href="">
                  Forgot password
                </a>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={cx("login-form-button")}
                >
                  Log in
                </Button>
                Or <Link to={"/register"}>register now!</Link>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
