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

import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.account.user);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

  const handleLogout = async () => {
    const res = await AuthService.LogoutApi();
    if (res && res.data.EC === 0) {
      dispatch(doLogoutAction());
      toast.success("Đăng xuất thành công");
      navigate("/");
    }
  };

  const itemsDropdown = [
    {
      label: (
        <div>
          <Link to="https://www.antgroup.com">1st menu item</Link>
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
                {isAuthenticated ? (
                  <Dropdown
                    menu={{
                      items: itemsDropdown,
                    }}
                    trigger={["click"]}
                    className={cx("poiter")}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        Welcome to {user?.username || ""}
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
