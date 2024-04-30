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
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
const { Header, Content, Footer, Sider } = Layout;

import AuthService from "../../services/AuthService";
import { doLogoutAction } from "../../redux/account/accountSlide";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(
    <Link to="/admin">Trang chủ</Link>,
    "sub1",
    <IconHome2 style={{ color: "#666" , width: '20' }} />
  ),
  getItem(
    <Link to="/admin/dashboard">Tổng quan</Link>,
    "sub2",
    <IconDashboard style={{ color: "#666" , width: '20' }} />
  ),
  getItem("Doanh mục", "sub3", <IconCategory style={{ color: "#666" , width: '20' }}  />, [
    getItem(<Link to="/admin/managerCatogory/list">Danh sách</Link>, "sub3-1"),
  ]),
  getItem("Khách hàng", "sub4", <IconUser style={{ color: "#666" , width: '20' }} />, [
    getItem(<Link to="/admin/managerCus/list">Danh sách</Link>, "sub4-1"),
  ]),
  getItem("Quản lí Tour", "sub5", <IconCamera style={{ color: "#666" , width: '20' }} />, [
    getItem(<Link to="/admin/managerTour/list">Danh sách tour</Link>, "sub5-1"),
    getItem(<Link to="/admin/managerTour/create">Tạo tour mới</Link>, "sub5-2"),
  ]),
  getItem("Quản lí Đặt Tour", "sub6", <IconCurrencyDollar style={{ color: "#666" , width: '20' }} />, [
    getItem(
      <Link to="/admin/managerBookingTour/list_update">
        Danh sách đặt tour
      </Link>,
      "sub6-1"
    ),
    getItem(
      <Link to="/admin/managerBookingTour/list_fail">Xử lí hủy lịch tour</Link>,
      "sub6-2"
    ),
  ]),

  // getItem("Quản lí bài đăng", "sub7", <TeamOutlined />, [
  //   getItem(
  //     <Link to="/admin/managerBlog/list">Danh sách bài đăng</Link>,
  //     "sub7-1"
  //   ),
  // ]),

  getItem("Quản lí voucher", "sub8", <IconGiftCard style={{ color: "#666" , width: '20' }} />, [
    getItem(
      <Link to="/admin/managerVoucher/listVoucher">DS voucher</Link>,
      "sub8-1"
    ),
  ]),

  getItem("Quản lí tin nhắn", "sub9", <IconMessage style={{ color: "#666" , width: '20' }} />, [
    getItem(
      <Link to="/admin/managerMessage/messages">Messager</Link>,
      "sub9-1"
    ),
  ]),

  getItem("Quản lí đánh giá", "sub11", <IconTextPlus style={{ color: "#666" , width: '20' }} />, [
    getItem(
      <Link to="/admin/managerReview/list">Quản lí Đánh giá</Link>,
      "sub11-1"
    ),
  ]),

  getItem("Thống kê", "sub10", <IconBrandGoogleAnalytics style={{ color: "#666" , width: '20' }} />, [
    getItem(
      <Link to="/admin/managerRevenue/tour">Doanh thu tour</Link>,
      "sub10-1"
    ),
    getItem(
      <Link to="/admin/managerRevenue/tours">Tổng doanh thu</Link>,
      "sub10-2"
    ),
    getItem(
      <Link to="/admin/managerRevenue/cancel">Thống kê hủy </Link>,
      "sub10-3"
    ),
  ]),
];

function LayoutAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.account.user);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = async () => {
    const res = await AuthService.LogoutApi();
    if (res && res.data.EC === 0) {
      dispatch(doLogoutAction());
      toast.success("Đăng xuất thành công");
      localStorage.setItem("room", "");
      localStorage.setItem("ID_User", "");
      navigate("/");
    } else {
      toast.error(res.data.EM);
    }
  };

  const itemsDropdown = [
    // {
    //   label: <a href="https://www.antgroup.com">1st menu item</a>,
    //   key: "0",
    // },
    // {
    //   label: <a href="https://www.aliyun.com">2nd menu item</a>,
    //   key: "1",
    // },
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
        {/* <Sider
          className={cx("bg-white border border-black")}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu defaultSelectedKeys={["1"]} mode="inline" items={items} />
        </Sider> */}

        {/* <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              border: "1px solid black",
              width: '100%',
            }}
          >
            <div className={cx("mx-5")}>
              <div className={cx("d-flex justify-content-between")}>
                <div>
                  <b>DU LỊCH MỌI NƠI</b>
                </div>
                <div>
                  <Dropdown
                    menu={{
                      items: itemsDropdown,
                    }}
                    trigger={["click"]}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        ADMIN
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
        </Layout> */}

        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            border: "1px solid black",
            width: "100%",
          }}
        >
          <div className={cx("mx-5")}>
            <div className={cx("d-flex justify-content-between")}>
              <div>
                <b>DU LỊCH MỌI NƠI</b>
              </div>
              <div>
                <Dropdown
                  menu={{
                    items: itemsDropdown,
                  }}
                  trigger={["click"]}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      ADMIN
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </div>
            </div>
          </div>
        </Header>

        <Layout>
          <Sider
            className={cx("bg-white border border-black")}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <div className="demo-logo-vertical" />
            <Menu defaultSelectedKeys={["1"]} mode="inline" items={items} />
          </Sider>

          <Layout>
            <Content>
              <div
                style={{
                  padding: 10,
                  minHeight: 500,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                <Outlet />
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}

export default LayoutAdmin;
