import className from "classnames/bind";
import styles from "./Header.module.scss";
const cx = className.bind(styles);

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import AuthService from "../../services/AuthService";
import { useDispatch, useSelector } from "react-redux";
import { doLogoutAction } from "../../redux/account/accountSlide";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

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
                <Nav.Link href="#link">Link</Nav.Link>
              </div>
              <div>
                {isAuthenticated ? (
                  <NavDropdown title={user?.username} id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      Action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Something
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      onClick={() => {
                        handleLogout();
                      }}
                    >
                      Đăng xuất
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <NavDropdown title="Tài khoản" id="basic-nav-dropdown">
                    <NavDropdown.Item>
                      <Link to={"/register"} className={cx("custoTaga")}>
                        Đăng ký
                      </Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to={"/login"} className={cx("custoTaga")}>
                        Đăng nhập
                      </Link>
                    </NavDropdown.Item>
                  </NavDropdown>
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
