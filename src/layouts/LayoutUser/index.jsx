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
    ]),
    getItem("Đơn mua", "sub2", <UserOutlined />, [
      getItem(<Link to="/user/order_buy">Đơn mua</Link>, "2"),
    ]),
    getItem("Kho voucher", "sub3", <UserOutlined />, [
      getItem(<Link to="/user/voucher">Hồ sơ</Link>, "3"),
    ]),
  ];
  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("container")}>
        <div className={cx("row border p-5")}>
          <div className={cx("col-lg-3")}>
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
          <div className={cx("col-lg-9")}>
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LayoutUser;
