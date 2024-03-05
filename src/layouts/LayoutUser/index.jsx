import className from "classnames/bind";
import styles from "./LayoutUser.module.scss";
const cx = className.bind(styles);
import { Link, Outlet } from "react-router-dom";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { Menu } from "antd";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

function LayoutUser() {
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem("Tài khoản của tôi", "sub1", <UserOutlined />, [
      getItem(<Link to="/user">Hồ sơ</Link>, "1"),
      getItem(<Link to="/user/change-password">Đổi mật khẩu</Link>, "13"),
    ]),
    getItem(
      <Link to="/user/order-buy">Đơn mua</Link>,
      "sub2",
      <UserOutlined />
    ),
    getItem(
      <Link to="/user/voucher">Kho voucher</Link>,
      "sub3",
      <UserOutlined />
    ),
  ];
  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("container")}>
        <div className={cx("row border p-4")}>
          <div className={cx("col-lg-3 border border-success")}>
            <div className={cx("d-flex justify-content-center")}>
              <Menu
                style={{
                  width: 256,
                }}
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                mode="inline"
                items={items}
              />
            </div>
          </div>
          <div className={cx("col-lg-9 border border-danger")}>
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LayoutUser;
