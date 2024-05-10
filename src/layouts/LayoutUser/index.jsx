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
import {
  IconMessage,
  IconHome2,
  IconBrandGoogleAnalytics,
  IconCategory,
  IconCurrencyDollar,
  IconCamera,
  IconUser,
  IconGiftCard,
  IconTextPlus,
  IconDashboard,
} from "@tabler/icons-react"; 

import { Menu } from "antd";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

function LayoutUser() {
  const urlCurrent = window.location.pathname;

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
    getItem(
      <Link to="/user">Hồ sơ</Link>,
      "/user",
      <IconUser style={{ color: "#666", width: "20" }} />
    ),

    getItem(
      <Link to="/user/order-buy">Đơn mua</Link>,
      "/user/order-buy",
      <IconCurrencyDollar style={{ color: "#666", width: "20" }} />
    ),
    getItem(
      <Link to="/user/voucher">Kho voucher</Link>,
      "/user/voucher",
      <IconGiftCard style={{ color: "#666", width: "20" }} />
    ),
  ];
  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("container")}>
        <div className={cx("row  p-4")}>
          <div className={cx("col-lg-3", "border_blue")}>
            <div className={cx("d-flex justify-content-center ")}>
              <Menu
                style={{
                  width: 256,
                }}
                defaultSelectedKeys={[urlCurrent]}
                defaultOpenKeys={["sub1"]}
                mode="inline"
                items={items}
                className={cx("my-4")}
              />
            </div>
          </div>
          <div className={cx("col-lg-9", "border_blue")}>
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LayoutUser;
