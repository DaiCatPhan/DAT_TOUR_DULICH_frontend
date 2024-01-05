import className from "classnames/bind";
import styles from "./Login.module.scss";
const cx = className.bind(styles);
import { useNavigate } from "react-router-dom";

import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import AuthService from "../../services/AuthService";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { doLoginAction } from "../../redux/account/accountSlide";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { email, password } = values;
    const res = await AuthService.loginApi({ email, password });
    if (res && res.data.EC == 0) {
      localStorage.setItem("accsessToken", res.data.DT.accsessToken);
      dispatch(doLoginAction(res.data.DT.tokentData));
      toast.success("Đăng nhập thành công");

      navigate("/");
    } else {
      toast.error(res.data.EM);
    }
  };

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

            <Form
              name="normal_login"
              className={cx("login-form")}
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Email!",
                  },
                ]}
              >
                <Input
                  prefix={
                    <UserOutlined className={cx("site-form-item-icon")} />
                  }
                  placeholder="Email"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu !",
                  },
                ]}
              >
                <Input
                  prefix={
                    <LockOutlined className={cx("site-form-item-icon")} />
                  }
                  type="password"
                  placeholder="Mật khẩu"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Ghi nhớ tôi</Checkbox>
                </Form.Item>

                <a className={cx("login-form-forgot")} href="">
                  Quên mật khẩu
                </a>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={cx("login-form-button")}
                >
                  Đăng nhập
                </Button>
                Hoặc <Link to={"/register"}>Đăng ký!</Link>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
