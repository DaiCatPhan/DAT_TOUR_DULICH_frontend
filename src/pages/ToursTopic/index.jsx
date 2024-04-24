import className from "classnames/bind";
import styles from "./ToursTopic.module.scss";
const cx = className.bind(styles);
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import moment from "moment";

import CardSearch from "../../components/CardSearch";
import data from "../../components/Data/data";

import TourService from "../../services/TourService";
import CategoryService from "../../services/CategoryService";
import { useLocation } from "react-router-dom";

import {
  IconClockHour10,
  IconBus,
  IconZeppelin,
  IconShip,
} from "@tabler/icons-react";

import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Button, Checkbox, Form, Input, DatePicker } from "antd";
import { useEffect, useState } from "react";

import FilterCondition from "./components/filterCondition/filterCondition";

function ToursTopic() {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [category_TYPE_TOUR, setCategory_TYPE_TOUR] = useState([]);
  const [category_ADDRESS_TOUR, setCategory_ADDRESS_TOUR] = useState([]);

  const nameParam = searchParams.get("name");
  const typeParam = searchParams.get("type");
  const startDayParam = searchParams.get("startDay");
  const endDayParam = searchParams.get("endDay");


  // Gọi API lấy dữ liệu
  const getTours = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const paramsObj = Array.from(params.keys()).reduce(
        (acc, val) => ({ ...acc, [val]: params.get(val) }),
        {}
      );
      const stringified = queryString.stringify(paramsObj);
      const res = await TourService.getTours(stringified);
      if (res && res.data.EC === 0) {
        setTours(res?.data?.DT);
      }
    } catch (error) {
      console.log("error >>", error);
    }
  };
  // Gọi API lấy dữ liệu category
  const getCategorys = async () => {
    try {
      const TYPE_TOUR = await CategoryService.readAllCategory("type=TYPE_TOUR");
      const ADDRESS_TOUR = await CategoryService.readAllCategory(
        "type=ADDRESS_TOUR"
      );
      if (TYPE_TOUR && TYPE_TOUR.data.EC == 0) {
        setCategory_TYPE_TOUR(TYPE_TOUR.data.DT.categories);
      }
      if (ADDRESS_TOUR && ADDRESS_TOUR.data.EC == 0) {
        setCategory_ADDRESS_TOUR(ADDRESS_TOUR.data.DT.categories);
      }
    } catch (error) {
      console.log("error >>", error);
    }
  };

  useEffect(() => {
    getTours();
    getCategorys();
  }, []);

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const itemsAddress = category_ADDRESS_TOUR?.map((item) => {
    return getItem(
      <a href={`/tours/topic?name=${item?.value}`}>{item?.value}</a>,
      `type=${item?.id}`
    );
  });

  const itemsTopic = category_TYPE_TOUR?.map((item) => {
    return getItem(
      <a href={`/tours/topic?type=${item?.value}`}>{item?.value}</a>,
      `type=${item?.id}`
    );
  });

  const onClick = (e) => {
    console.log("click ", e);
  };

  const onClickFilter = async (data) => {
    const { item, sortKey } = data;
    let sortQuery = {};
    sortQuery[item.value] = true;
    sortQuery.sortOrder = sortKey.value;

    const params = new URLSearchParams(window.location.search);
    const paramsObj = Array.from(params.keys()).reduce(
      (acc, val) => ({ ...acc, [val]: params.get(val) }),
      {}
    );
    const sortParams = [
      "sortByStar",
      "sortBooking",
      "sortByPrice",
      "sortByStartDate",
      "sortByDuration",
      "sortBycreatedAt",
      "sortOrder",
    ];

    sortParams.forEach((param) => {
      if (paramsObj[param]) {
        delete paramsObj[param];
      }
    });

    paramsObj[item.value] = true;
    paramsObj.sortOrder = sortKey.value;

    const stringified = queryString.stringify(paramsObj);

    navigate(`?${stringified}`);
    getTours();
  };

  const onFinish = async (values) => {
    const { name, startDay, startDayEnd } = values;
    const startDate = startDay?.$d;
    const startDateEnd = startDayEnd?.$d;
    let condition = `name=${name || ""}&startDay=${
      startDay || ""
    }&startDayEnd=${startDayEnd || ""}`;
    const res = await TourService.getTours(condition);
    if (res && res.data.EC === 0) {
      setTours(res.data.DT);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div>
          <Form name="basic" style={{}} onFinish={onFinish} autoComplete="off">
            <div className={cx("formSearch")}>
              <div className={cx("mx-2 ")}>
                <div>
                  <Form.Item name="name">
                    <Input
                      className={cx("inputSearch")}
                      placeholder="Bạn muốn đi đâu ?"
                    />
                  </Form.Item>
                </div>
              </div>

              <div className={cx("mx-2")}>
                <Form.Item className={cx("w-100")} name="startDay">
                  <DatePicker
                    format="DD/MM/YYYY  "
                    className={cx("inputSearch")}
                    placeholder="Chọn ngày  "
                  />
                </Form.Item>
              </div>

              <div className={cx("mx-2")}>
                <Form.Item name="startDayEnd">
                  <DatePicker
                    format="DD/MM/YYYY  "
                    className={cx("inputSearch")}
                    placeholder="Chọn ngày  "
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
          <div className={cx("col-lg-9")}>
            <div className={cx("border")}>
              <div className={cx("nameTypeTour")}>
                Du Lịch : {nameParam || typeParam}
              </div>

              <FilterCondition onClickFilter={onClickFilter} />

              <div className={cx("px-3")}>
                {tours?.tours?.map((item) => {
                  return (
                    <Link to={`/tours/${item?.id}`}>
                      <CardSearch key={item.id} item={item} />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToursTopic;
