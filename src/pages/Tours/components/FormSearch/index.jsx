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


function FormSearch() {
  const [name, setName] = useState("");
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");
  const navigate = useNavigate();

  const onChangeDatePickerStartDay = (date) => {
    const value = date?.$d;
    setStartDay(value);
  };

  const onChangeDatePickerEndDay = (date) => {
    const value = date?.$d;
    setEndDay(value);
  };

  const onChangeNameTour = (e) => {
    const value = e.target.value;
    setName(value);
  };

  const handleSubmit = async () => {
    if (!name && !startDay) {
      toast.warning("Vui lòng nhập nơi mà bạn muốn đến");
      return;
    }
    navigate(`/tours/topic?name=${name || ""}&startDay=${startDay}`); 
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
            <DatePicker
              placeholder="Chọn ngày kết thúc"
              onChange={onChangeDatePickerEndDay}
              className={cx("input", "DatePicker")}
              format={"DD-MM-YYYY"}
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
