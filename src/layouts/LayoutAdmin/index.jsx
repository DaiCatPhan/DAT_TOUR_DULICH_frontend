import className from "classnames/bind";
import styles from "./LayoutAdmin.module.scss";
const cx = className.bind(styles);

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";

import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(<Link to="/admin">Trang chủ</Link>, "1", <PieChartOutlined />),
  getItem(
    <Link to="/admin/dashboard">Dashboard</Link>,
    "2",
    <DesktopOutlined />
  ),
  getItem("Doanh mục", "sub1", <UserOutlined />, [
    getItem(<Link to="/admin/managerCatogory/list">Danh sách</Link>, "3"),
  ]),
  getItem("Khách hàng", "sub2", <UserOutlined />, [
    getItem(<Link to="/admin/managerCus/list">Danh sách</Link>, "3"),
  ]),
  getItem("Quản lí Tour", "sub3", <TeamOutlined />, [
    getItem(<Link to="/admin/managerTour/list">Danh sách tour</Link>, "8"),
    getItem(<Link to="/admin/managerTour/create">Tạo tour mới</Link>, "9"),
  ]),
  getItem("Quản lí Đặt Tour", "sub4", <TeamOutlined />, [
    getItem(<Link to="/admin/managerBookingTour/list">Duyệt</Link>, "18"),
    getItem(
      <Link to="/admin/managerBookingTour/list_update">
        Danh sách đặt tour
      </Link>,
      "118"
    ),
  ]),

  getItem("Quản lí bài đăng", "sub5", <TeamOutlined />, [
    getItem(<Link to="/admin/managerBlog/list">Danh sách bài đăng</Link>, "8"),
  ]),

  getItem("Quản lí voucher", "sub6", <TeamOutlined />, [
    getItem(
      <Link to="/admin/managerVoucher/listVoucher">DS voucher</Link>,
      "9"
    ),
  ]),

  getItem("Quản lí tin nhắn", "sub7", <TeamOutlined />, [
    getItem(<Link to="/admin/managerMessage/messages">Messager</Link>, "8"),
  ]),
  getItem("Thống kê", "sub8", <TeamOutlined />, [
    getItem(
      <Link to="/admin/managerRevenue/tour">Doanh thu tour</Link>,
      "8"
    ),
    getItem(
      <Link to="/admin/managerRevenue/tours">Tổng doanh thu</Link>,
      "9"
    ),
  ]),
];
function LayoutAdmin() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = async () => {
    alert("Đăng xuất");
  };

  const itemsDropdown = [
    {
      label: <a href="https://www.antgroup.com">1st menu item</a>,
      key: "0",
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: "Đăng xuất",
      key: "3",
      onClick: handleLogout,
    },
  ];

  return (
    <div>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Sider>

        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              border: "1px solid black",
            }}
          >
            <div className={cx("border mx-5")}>
              <div className={cx("d-flex justify-content-between")}>
                <div>HEADER</div>
                <div className={cx("border")}>
                  <Dropdown
                    menu={{
                      items: itemsDropdown,
                    }}
                    trigger={["click"]}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        Welcome Phan Dai Cat
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                </div>
              </div>
            </div>
          </Header>

          <Content>
            <div
              style={{
                padding: 24,
                minHeight: 500,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </div>
          </Content>

          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default LayoutAdmin;
