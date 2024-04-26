import className from "classnames/bind";
import styles from "./Header.module.scss";
const cx = className.bind(styles);

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import AuthService from "../../services/AuthService";
import { useDispatch, useSelector } from "react-redux";
import { doLogoutAction } from "../../redux/account/accountSlide";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import { Button, Dropdown, Space } from "antd";
import { Badge } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { IconMessage, IconBell } from "@tabler/icons-react";

import CardNotification from "./components/CardNotification";

import NotificationService from "../../services/NotificationService";
import { useEffect, useState } from "react";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.account.user);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

  const [listNotification, setListNotification] = useState([]);

  const handleLogout = async () => {
    const res = await AuthService.LogoutApi();
    if (res && res.data.EC === 0) {
      dispatch(doLogoutAction());
      toast.success("Đăng xuất thành công");
      localStorage.setItem("room", "");
      localStorage.setItem("ID_User", "");
      navigate("/");
    }
  };

  const getListNotification = async () => {
    const res = await NotificationService.read(`ID_Customer=${user?.id}`);
    if (res && res.data.EC == 0) {
      setListNotification(res.data.DT);
    }
  };

  useEffect(() => {
    getListNotification();
  }, [user]);

  const itemsDropdown = [
    {
      label: (
        <div>
          <Link to="/user">Tải khoản của tôi</Link>
        </div>
      ),
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

  const itemsDropdownNotLogin = [
    {
      label: (
        <div className={cx(" bg-primary mt-1 px-5 py-1 text-center  ")}>
          <Link className={cx("text-white ", "textLogin")} to="/login">
            Đăng nhập
          </Link>
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <p className={cx("mb-0 ")}>
          Chưa có tài khoản ? <Link to="/register">Đăng ký </Link> ngay
        </p>
      ),
      key: "1",
    },
  ];

  const itemsNotification = listNotification?.rows?.map((item) => {
    return {
      label: <CardNotification key={item.id} item={item} />,
      key: "0",
    };
  });

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">DU LỊCH</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav ">
            <Nav
              className={cx(
                "d-flex justify-content-between w-100 align-items-center"
              )}
            >
              <div className={cx("d-flex ")}>
                <Nav.Link href="/tours">TOURS</Nav.Link>
                <Nav.Link href="/tours/topic">CHỦ ĐỀ</Nav.Link>
                <Nav.Link href="/tours/blogs">TIN TỨC</Nav.Link>
                <Nav.Link href="/tours/voucher">VOUCHER</Nav.Link>
              </div>

              <div>
                <div>
                  {isAuthenticated ? (
                    <div className={cx("d-flex")}>
                      <div className={cx("mx-1", "poiter", "iconMessage")}>
                        <Dropdown
                          menu={{
                            items: itemsNotification,
                          }}
                          placement="bottom"
                          arrow
                          trigger={["click"]}
                        >
                          <Badge
                            count={listNotification?.countNoRead || 0}
                            size="small"
                          >
                            <IconBell />
                          </Badge>
                        </Dropdown>
                      </div>

                      <div className={cx("mx-4", "poiter", "iconMessage")}>
                        <Link to={"/user/message"}>
                          <IconMessage />
                        </Link>
                      </div>
                      <div>
                        <Dropdown
                          menu={{
                            items: itemsDropdown,
                          }}
                          className={cx("poiter")}
                        >
                          <a onClick={(e) => e.preventDefault()}>
                            <Space>
                              Welcome to {user?.username || ""}
                              <DownOutlined />
                            </Space>
                          </a>
                        </Dropdown>
                      </div>
                    </div>
                  ) : (
                    <Dropdown
                      menu={{
                        items: itemsDropdownNotLogin,
                      }}
                      trigger={["click"]}
                      className={cx("poiter")}
                    >
                      <a onClick={(e) => e.preventDefault()}>
                        <Space>
                          Tài khoản
                          <DownOutlined />
                        </Space>
                      </a>
                    </Dropdown>
                  )}
                </div>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
