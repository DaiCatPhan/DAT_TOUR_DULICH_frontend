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

import { Button, Dropdown, Space, Tabs, Popover } from "antd";
import { Badge } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { IconMessage, IconBell } from "@tabler/icons-react";
import { Empty } from "antd";

import CardNotification from "./components/CardNotification";

import NotificationService from "../../services/NotificationService";
import MessageService from "../../services/MessageService";
import { useEffect, useState } from "react";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.account.user);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const [listNotification, setListNotification] = useState([]);
  const [tabNotification, setTabNotification] = useState("");
  const [countMessage, setCountMessage] = useState("");
  const [listMessageUser, setListMessageUser] = useState({});

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
    let condition = ``;
    if (user?.id) {
      condition += `ID_Customer=${user?.id}`;
    }
    if (tabNotification) {
      condition += `&${tabNotification}`;
    }
    const res = await NotificationService.read(condition);
    if (res && res.data.EC == 0) {
      setListNotification(res.data.DT);
    }
  };

  const ID_User = localStorage.getItem("ID_User");
  const getListRoomOfUser = async () => {
    const res = await MessageService.listRoomOfUser(`userOne=${ID_User}`);
    if (res && res.data.EC == 0) {
      setListMessageUser(res.data.DT[0]);
      setCountMessage(res.data.DT[0]?.count);
    }
  };

  useEffect(() => {
    getListRoomOfUser();
    getListNotification();
  }, [user, tabNotification]);

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

  const onChangeTabNotifition = (key) => {
    setTabNotification(key);
  };

  const handleUpdateNotification = async (data) => {
    const res = await NotificationService.update({
      ID_Notification: data.id,
      read: 1,
    });
  };

  const handleUpdateMessage = async () => {
    const data = {
      ID_Room: listMessageUser.id,
      ID_User: listMessageUser.userTwo,
    };
    const res = await MessageService.update(data);
  };

  const itemsNotification = (
    <div>
      <Tabs
        defaultActiveKey=""
        items={[
          {
            key: "",
            label: "Tất cả",
          },
          {
            key: "read=0",
            label: "Chưa đọc",
          },
          {
            key: "",
            label: "",
          },
        ]}
        onChange={onChangeTabNotifition}
      />
      {listNotification?.rows?.length <= 0 ? (
        <Empty />
      ) : (
        listNotification?.rows?.map((item) => {
          return (
            <CardNotification
              key={item.id}
              item={item}
              handleUpdateNotification={handleUpdateNotification}
            />
          );
        })
      )}
    </div>
  );

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
                {/* <Nav.Link href="/tours/blogs">TIN TỨC</Nav.Link> */}
                <Nav.Link href="/tours/voucher">VOUCHER</Nav.Link>
              </div>

              <div>
                <div>
                  {isAuthenticated ? (
                    <div className={cx("d-flex")}>
                      <div className={cx("mx-1", "poiter", "iconMessage")}>
                        <Popover content={itemsNotification} trigger="click">
                          <Badge
                            count={listNotification?.countNoRead || 0}
                            size="small"
                          >
                            <IconBell />
                          </Badge>
                        </Popover>
                      </div>

                      <div className={cx("mx-4", "poiter", "iconMessage")}>
                        <Link to={"/user/message"}>
                          <Badge count={countMessage} size="small">
                            <IconMessage onClick={handleUpdateMessage} />
                          </Badge>
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
                              {user?.username || ""}
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

// faber_loui43755
// WCroftoon471
// ChrisJohns22444
// fulton_ste12103
// CharlsonCh12470
// BlakeFord92347
// ibrahim_sidiqi1
