import className from "classnames/bind";
import styles from "./OrderBuy.module.scss";
const cx = className.bind(styles);

import { Space, Table, Tag } from "antd";
import { Tabs } from "antd";
import { useState } from "react";

function OrderBuy() {
  const [listBookingTour, setListBookingTour] = useState([]);

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
      key: "data",
      render: (data) => (
        <div className={cx("cardOrderBuy")}>
          <div>
            <div className={cx("titleHeader")}>
              <div>
                <div>
                  <Tag className={cx("poiter")} color="magenta">
                    Xem tour
                  </Tag>
                  <Tag className={cx("poiter")} color="#108ee9">
                    Chi tiết
                  </Tag>
                </div>
              </div>
              <div>Tour đã được đặt thành công | HOÀN THÀNH</div>
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
              <div className={cx("contentCard")}>
                <div className={cx("name")}>
                  Tour Limousine Cao Cấp Miền Tây 2N2Đ: Cà Mau - Cha Diệp - Sóc
                  Trăng Cánh Đồng Quạt Gió
                </div>
                <div className={cx("d-flex")}>
                  <div>Khởi hành : </div>
                  <div>1/2/2023 </div>
                  <div className={cx("mx-1")}>-</div>
                  <div> 4/2/2023</div>
                </div>
                <div className={cx("d-flex   w-50 justify-content-between")}>
                  <div>Người lớn : </div>
                  <div>x3</div>
                  <div>2.000.000 vnd</div>
                </div>
                <div className={cx("d-flex   w-50 justify-content-between")}>
                  <div>Trẻ em : </div>

                  <div>
                    <span className={cx("ml_22")}>x3</span>
                  </div>
                  <div>2.000.000 vnd</div>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("my-2")}></div>

          <div className={cx("d-flex justify-content-end", "bgcolor_FFFEFB")}>
            <div></div>
            <div className={cx("evaluate")}>
              <div className={cx("intoMoney")}>
                Thành tiền: <span>39,800,000 vnd</span>
              </div>
              <div className={cx("d-flex mt-3")}>
                <button className={cx("btn_booking")}>Đặt tour lại</button>
                <button className={cx("btn_eval")}>Đánh giá </button>
              </div>
            </div>
          </div>
        </div>
      ),
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
        <Table dataSource={dataSource} columns={columns} />;
        {/* <div className={cx("cardOrderBuy")}>
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
        </div> */}
      </div>
    </div>
  );
}

export default OrderBuy;
