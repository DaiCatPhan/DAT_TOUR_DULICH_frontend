import className from "classnames/bind";
import styles from "./FormSearch.module.scss";
const cx = className.bind(styles);
import { Input, DatePicker } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { IconMapPin } from "@tabler/icons-react";
import { useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Empty } from "antd";
import queryString from "query-string";
import { InputNumber } from "antd";

function FormSearch() {
  const [name, setName] = useState("");
  const [startDay, setStartDay] = useState("");
  const [priceStart, setPriceStart] = useState("");
  const navigate = useNavigate();

  const onChangeDatePickerStartDay = (date) => {
    setStartDay(date);
  };

  const onChangePrice = (date) => {
    setPriceStart(date);
  };

  const onChangeNameTour = (e) => {
    const value = e.target.value;
    setName(value);
  };

  const handleSubmit = async () => {
    const condition = {};
    if (name) {
      condition.name = name;
    }

    if (startDay) {
      condition.startDay = moment(startDay?.$d).format("YYYY-MM-DD");
    }

    if (priceStart) {
      condition.priceStart = priceStart;
    }
    const stringified = queryString.stringify(condition);

    navigate(`/tours/topic?${stringified}`);
  };

  const onFinish = async (values) => {
    const { name, startDay, startDayEnd } = values;

    const condition = {};
    if (name) {
      condition.name = name;
    }
    if (startDay) {
      condition.startDay = moment(startDay?.$d).format("YYYY-MM-DD");
    }
    if (startDayEnd) {
      condition.startDayEnd = moment(startDayEnd?.$d).format("YYYY-MM-DD");
    }
    const stringified = queryString.stringify(condition);

    navigate(`?${stringified}`);
    getTours();
  };
  return (
    <div>
      <div className={cx("text-white font-weight-bold")}>
        <h1>Thế giới Tour trong tay bạn </h1>
        <p>Phục vụ tận tâm , giá siêu ưu đãi </p>
      </div>

      <div className={cx("formSearch")}>
        <div className={cx("d-flex flex-wrap")}>
          <Input
            placeholder="Bạn muốn đi đâu ?"
            className={cx("input")}
            prefix={<IconMapPin color="grey" />}
            onChange={onChangeNameTour}
          />
        </div>
        <div className={cx("my-3")}></div>

        <div className={cx("d-flex flex-wrap justify-content-between ")}>
          <div>
            <DatePicker
              placeholder="Chọn ngày khởi hành"
              onChange={onChangeDatePickerStartDay}
              className={cx("input", "DatePicker")}
              format={"DD-MM-YYYY"}
            />
          </div>

          <div>
            <InputNumber
              onChange={onChangePrice}
              className={cx("inputSearchPrice")}
              placeholder="Nhập giá VND"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </div>
          <div>
            <button onClick={handleSubmit} className={cx("btnSearch")}>
              Tìm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormSearch;
