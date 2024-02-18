import className from "classnames/bind";
import styles from "./ToursTopic.module.scss";
const cx = className.bind(styles);
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import CardSearch from "../../components/CardSearch";
import data from "../../components/Data/data";

import TourService from "../../services/TourService";
import { useLocation } from "react-router-dom";

import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Button, Checkbox, Form, Input, DatePicker } from "antd";
import { useEffect, useState } from "react";

function ToursTopic() {
  const [condition, setCondition] = useState("");
  const [tours, setTours] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const nameParam = searchParams.get("name");
  const typeParam = searchParams.get("type");

  // Gọi API lấy dữ liệu
  const getTours = async () => {
    try {
      const res = await TourService.getTours(condition);
      console.log("res >>>>>>>", res);
      if (res && res.data.EC === 0) {
        setTours(res?.data?.DT);
      }
    } catch (error) {
      console.log("error >>", error);
    }
  };

  useEffect(() => {
    getTours();
  }, [nameParam, typeParam]);

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const itemsAddress = [
    // getItem("Sapa", "name=Sapa"),
    // getItem("Nha Trang", "name=Nha Trang"),
    // getItem("Đà Nẵng", "name=Đà Nẵng"),
    // getItem("Hạ Long", "name=Hạ Long"),
    // getItem("Hà Nội", "name=Hà Nội"),
    // getItem("Buôn Mê Thuột", "name=Buôn Mê Thuột"),
    // getItem("Quy Nhơn", "name=Quy Nhơn"),
    // getItem("Phan Thiết", "name=Phan Thiết"),
    // getItem("Phú Quốc", "name=Phú Quốc"),
    // getItem("Phú Yên", "name=Phú Yên"),

    getItem(<a href="/tours/topic?name=Sapa">Sapa</a>, "name=Sapa"),
    getItem(
      <a href="/tours/topic?name=Nha Trang">Nha Trang</a>,
      "name=Nha Trang"
    ),
    getItem(<a href="/tours/topic?name=Đà Nẵng">Đà Nẵng</a>, "name=Đà Nẵng"),
    getItem(<a href="/tours/topic?name=Hạ Long">Hạ Long</a>, "name=Hạ Long"),
    getItem(<a href="/tours/topic?name=Hà Nội">Hà Nội</a>, "name=Hà Nội"),
    getItem(
      <a href="/tours/topic?name=Buôn Mê Thuộc">Buôn Mê Thuột</a>,
      "name=Buôn Mê Thuột"
    ),
    getItem(<a href="/tours/topic?name=Quy Nhơn">Quy Nhơn</a>, "name=Quy Nhơn"),
    getItem(
      <a href="/tours/topic?name=Phan Thiết">Phan Thiết</a>,
      "name=Phan Thiết"
    ),
    getItem(<a href="/tours/topic?name=Phú Quốc">Phú Quốc</a>, "name=Phú Quốc"),
    getItem(<a href="/tours/topic?name=Phú Yên">Phú Yên</a>, "name=Phú Yên"),
  ];

  const itemsTopic = data?.typeTour?.map((item) => {
    return getItem(
      <a href={`/tours/topic?type=${item?.type}`}>{item?.type}</a>,
      `type=${item?.type}`
    );
  });

  const onClick = (e) => {
    console.log("click ", e);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div>
          <Form
            name="basic"
            style={{}}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className={cx("formSearch")}>
              <div className={cx("mx-2 ")}>
                <div>
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input
                      className={cx("inputSearch")}
                      placeholder="Bạn muốn đi đâu ?"
                    />
                  </Form.Item>
                </div>
              </div>

              <div className={cx("mx-2")}>
                <Form.Item>
                  <DatePicker className={cx("inputSearch")} />
                </Form.Item>
              </div>

              <div className={cx("mx-2")}>
                <Form.Item>
                  <Input
                    name="address"
                    className={cx("inputSearch")}
                    placeholder="Khởi hành từ Cần Thơ"
                  />
                </Form.Item>
              </div>

              <div className={cx("mx-2  ")}>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className={cx("btnSearch")}
                  >
                    Tìm
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
        <div className={cx("row m-0 ", "vh-80")}>
          <div className={cx("col-lg-3 p-0  border border-danger")}>
            <div className={cx("d-flex justify-content-center my-3")}>
              <div className={cx("border border-success ", "w-90")}>
                <div className={cx("text-center py-2 fs-5")}>
                  Địa điểm HOT trong nước
                </div>
                <Menu
                  onClick={onClick}
                  style={{
                    width: 256,
                  }}
                  defaultSelectedKeys={[""]}
                  defaultOpenKeys={["sub1"]}
                  mode="inline"
                  items={itemsAddress}
                  className={cx("w-100")}
                />
              </div>
            </div>

            <div className={cx("d-flex justify-content-center my-3")}>
              <div className={cx("border border-success ", "w-90")}>
                <div className={cx("text-center py-2 fs-5")}>
                  Tours theo chủ đề
                </div>
                <Menu
                  onClick={onClick}
                  style={{
                    width: 256,
                  }}
                  defaultSelectedKeys={[""]}
                  defaultOpenKeys={["sub1"]}
                  mode="inline"
                  items={itemsTopic}
                  className={cx("w-100")}
                />
              </div>
            </div>
          </div>
          <div className={cx("col-lg-9 border border-primary")}>
            <div className={cx("px-3 my-3 border")}>
              <div>Tour Du Lịch Tết Nguyên Đán từ Hồ Chí Minh</div>
              <div>
                <CardSearch />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToursTopic;
