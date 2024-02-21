import className from "classnames/bind";
import styles from "./FormSearch.module.scss";
const cx = className.bind(styles);
import { Input, DatePicker } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { IconMapPin } from "@tabler/icons-react";
function FormSearch() {
  const onChangeDatePicker = (date, dateString) => {
    console.log(date, dateString);
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
          />
        </div>
        <div className={cx("my-3")}></div>

        <div className={cx("d-flex flex-wrap justify-content-between ")}>
          <div>
            <DatePicker
              placeholder="Chọn ngày"
              onChange={onChangeDatePicker}
              className={cx("input", "DatePicker")}
            />
          </div>

          <div>
            <Input
              value={"Khởi hành từ Cần Thơ"}
              className={cx("input", "DatePicker")}
            />
          </div>
          <div>
            <button className={cx("btnSearch")}>Tìm</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormSearch;
