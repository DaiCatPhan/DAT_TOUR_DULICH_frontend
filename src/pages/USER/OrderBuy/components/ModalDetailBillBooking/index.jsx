import className from "classnames/bind";
import styles from "./ModalDetailBillBooking.module.scss";
const cx = className.bind(styles);

import { toast } from "react-toastify";
import { Button, Modal, Table } from "antd";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useState } from "react";
const mdParser = new MarkdownIt(/* Markdown-it options */);

function ModalDetailBillBooking(props) {
  const {
    isShowModalDetailBillBooking,
    setIsShowModalDetailBillBooking,
    dataModalDetailBillBooking,
    setDataModalDetailBillBooking,
    getListBookingTour,
  } = props;

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {};
  const handleCancel = () => {
    setIsShowModalDetailBillBooking(false);
  };

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Giá/người lớn",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Giá/trẻ em",
      dataIndex: "age",
      key: "age",
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <Modal
        open={isShowModalDetailBillBooking}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={700}
        style={{ top: 25 }}
      >
        <div className={cx("bill")}>
          <div className={cx("ss1")}>
            <h2 className={cx("text-center")}>CHI TIẾT ĐẠT TOUR</h2>
            <div>Cam on qui khách da tin tuong va xac nhan</div>
            <div>
              <b>
                IVIVU se kiem tra tinh trang tour theo thong tin ben duoi va
                phan hôi cho Qui Khach
              </b>
            </div>
          </div>
          <div className={cx("my-4")}></div>
          <div className={cx("ss2")}>
            <div className={cx("nameTour")}>
              Tour Ninh Binh 1N : Chua Tam Giac -Trang An{" "}
            </div>
            <div>
              <div className={cx("row  my-4")}>
                <div className={cx("col-lg-3")}>Mã Tour</div>
                <div className={cx("col-lg-3")}>
                  <b>T01 DL</b>
                </div>
                <div className={cx("col-lg-3")}>Ma Tour</div>
                <div className={cx("col-lg-3")}>Ma Tour</div>
              </div>
              <div className={cx("row  my-4")}>
                <div className={cx("col-lg-3")}>Thời gian</div>
                <div className={cx("col-lg-3")}>
                  <b>4 ngày 3 đêm</b>
                </div>
                <div className={cx("col-lg-3")}>Số khách</div>
                <div className={cx("col-lg-3")}>
                  <div>
                    <b>2 người lớn</b>
                  </div>
                  <div>
                    <b>4 trẻ em</b>
                  </div>
                </div>
              </div>
              <div className={cx("row  my-2")}>
                <div className={cx("col-lg-3")}>Ngày khởi hành</div>
                <div className={cx("col-lg-3")}>
                  <b>6/3/2024</b>
                </div>
                <div className={cx("col-lg-3")}>Ngày kết thúc</div>
                <div className={cx("col-lg-3")}>
                  <b>6/3/2024</b>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("my-4")}></div>

          <div className={cx("ss3")}>
            <h4>Thông tin khách hàng</h4>
            <div className={cx("row")}>
              <div className={cx("col-lg-3")}>Họ và tên</div>
              <div className={cx("col-lg-3")}>
                <b>Phan Đài Cát</b>
              </div>
              <div className={cx("col-lg-3")}>Số điện thoại</div>
              <div className={cx("col-lg-3")}>
                <b>0328472724</b>
              </div>
            </div>
            <div className={cx("row my-1")}>
              <div className={cx("col-lg-3")}>Email</div>
              <div className={cx("col-lg my-2")}>
                <b>phandaicat12032002@gmail.com</b>
              </div>
            </div>
          </div>
          <div className={cx("my-2")}></div>
          <div className={cx("ss4")}>
            <h4>Giá tour chi tiết</h4>
            <div className={cx("row  my-2")}>
              <div className={cx("col-lg-3")}>Giá tour người lớn</div>
              <div className={cx("col-lg-3")}>
                <b>3.000.000 vnd</b>
              </div>
              <div className={cx("col-lg-3")}>Giá tour trẻ em</div>
              <div className={cx("col-lg-3")}>
                <b>3.000.000 vnd</b>
              </div>
            </div>
            <div className={cx("row  my-2")}>
              <div className={cx("col-lg-3")}> </div>
              <div className={cx("col-lg-3")}></div>
              <div className={cx("col-lg-3", "price")}>Thành giá tour</div>
              <div className={cx("col-lg-3")}>
                <b className={cx("money")}>3.000.000 vnd</b>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalDetailBillBooking;
