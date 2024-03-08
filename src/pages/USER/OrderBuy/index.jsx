import className from "classnames/bind";
import styles from "./OrderBuy.module.scss";
const cx = className.bind(styles);

import { Space, Table, Tag } from "antd";
import { Tabs } from "antd";

function OrderBuy() {
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "Tất cả",
    },
    {
      key: "2",
      label: "Chờ xác nhận",
    },
    {
      key: "3",
      label: "Đã xác nhận",
    },
    {
      key: "4",
      label: "Hoàn thành",
    },
    {
      key: "5",
      label: "Đã hủy",
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <div className={cx("p-2")}>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        {/* <Table dataSource={dataSource} columns={columns} />; */}
        <div className={cx("cardOrderBuy")}>
          <div className={cx("border ")}>
            <div className={cx("border d-flex justify-content-between")}>
              <div className={cx("d-flex")}>
                <div>IVIVU</div>
                <div>Chat</div>
                <div>Xem tour</div>
              </div>
              <div>Đơn hàng đã được giao thành công HOÀN THÀNH</div>
            </div>
            <div className={cx("d-flex")}>
              <div>
                <img
                  src="https://down-vn.img.susercontent.com/file/828dd103dc4133e9320d3bf521383a12_tn"
                  alt="notFound"
                  width={130}
                  height={130}
                />
              </div>
              <div>
                - Mũi Cà Mau: du khách được thăm cột mốc toạ độ quốc gia, ngắm
                rừng, ngắm biển, chiêm ngưỡng ráng chiều ẩn hiện trên vùng trời
                biển bao la. Chinh Phục Cực Nam Tổ Quốc - Tham Quan Nhà Thờ Cha
                Diệp: còn gọi là nhà thờ Tắc Sậy ở Bạc Liêu gắn liền với nơi an
                nghỉ của Linh mục Trương Bửu Diệp. Đây là một trong những công
                trình Công giáo nổi tiếng nhất ở khu vực miền Tây và nhiều người
                biết đến với lòng sùng mộ.
              </div>
              <div>₫34.800</div>
            </div>
          </div>
          <div className={cx("my-2")}></div>
          <div className={cx("border")}>
            <div>Thành tiền: ₫39.800</div>
            <div>
              <button>Đặt tour lại</button>
              <button>Đánh giá tour</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderBuy;
