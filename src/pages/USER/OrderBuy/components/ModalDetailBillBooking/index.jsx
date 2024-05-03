import className from "classnames/bind";
import styles from "./ModalDetailBillBooking.module.scss";
const cx = className.bind(styles);

import { toast } from "react-toastify";
import { Button, Modal, Table } from "antd";
import { useState } from "react";
import moment from "moment";
import { IconFileTypePdf } from "@tabler/icons-react";
import Funtion from "../../../../../components/Functions/function";

import ModalBillPDF from "../ModalBillPDF";

function ModalDetailBillBooking(props) {
  const {
    isShowModalDetailBillBooking,
    setIsShowModalDetailBillBooking,
    dataModalDetailBillBooking,
    setDataModalDetailBillBooking,
    getListBookingTour,
  } = props;
  const { Calendar, Customer, Voucher } = dataModalDetailBillBooking;
  console.log("dataModalDetailBillBooking", dataModalDetailBillBooking);

  const [confirmLoading, setConfirmLoading] = useState(false);

  // PDF
  const [isShowModalBillPDF, setIsShowModalBillPDF] = useState(false);
  const [dataModalBillPDF, setDataModalBillPDF] = useState({});
  const handleModalBillPDF = () => {
    setIsShowModalBillPDF(true);
    setDataModalBillPDF(dataModalDetailBillBooking);
    setIsShowModalDetailBillBooking(false);
  };

  const handleOk = () => {};
  const handleCancel = () => {
    setIsShowModalDetailBillBooking(false);
  };

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
          <div>
            <div className={cx("poiter")} onClick={handleModalBillPDF}>
              <IconFileTypePdf />
            </div>
            <h2 className={cx("text-center")}>CHI TIẾT ĐẶT TOUR</h2>
          </div>
          <div className={cx("ss1")}>
            <div>Cảm ơn quí khách đã tin tưởng và đặt tour</div>
            <div>
              Chúng tôi sẽ kiểm tra tình trạng tour theo thông tin bên dưới và
              phản hồi cho quí khách.
            </div>
          </div>
          <div className={cx("my-1")}></div>
          <div className={cx("ss2")}>
            <div className={cx("nameTour")}>{Calendar?.Tour?.name}</div>
            <div>
              <div className={cx("row  my-2")}>
                <div className={cx("col-lg-3")}>Mã Tour</div>
                <div className={cx("col-lg-3")}>
                  <b>{Calendar?.ID_Tour}</b>
                </div>
              </div>
              <div className={cx("row  my-2")}>
                <div className={cx("col-lg-3")}>Thời gian</div>
                <div className={cx("col-lg-3 fw-bold")}>
                  <span>{Calendar?.Tour?.numbeOfDay}</span>
                  <span className={cx("mx-1")}>ngày</span>
                  <span>{Calendar?.Tour?.numberOfNight}</span>
                  <span className={cx("mx-1")}>đêm</span>
                </div>
              </div>
              <div className={cx("row")}>
                <div className={cx("col-lg-3")}>Ngày khởi hành</div>
                <div className={cx("col-lg-3")}>
                  <b>{moment(Calendar?.startDay).format("DD-MM-YYYY")}</b>
                </div>
                <div className={cx("col-lg-3")}>Ngày kết thúc</div>
                <div className={cx("col-lg-3")}>
                  <b>{moment(Calendar?.endDay).format("DD-MM-YYYY")}</b>
                </div>
              </div>
            </div>

            <div className={cx("row  my-2")}>
              <div className={cx("col-lg-3")}>Giá tour người lớn</div>
              <div className={cx("col-lg-3 fw-bold")}>
                <span>
                  {Funtion.formatNumberWithCommas(Calendar?.priceAdult)}
                </span>
                <span className={cx("mx-1")}>vnd</span>
              </div>
              <div className={cx("col-lg-3")}>Giá tour trẻ em</div>
              <div className={cx("col-lg-3 fw-bold")}>
                <span>
                  {Funtion.formatNumberWithCommas(Calendar?.priceChild)}
                </span>
                <span className={cx("mx-1")}>vnd</span>
              </div>
            </div>

            <div className={cx("row  my-2")}>
              <div className={cx("col-lg-3")}>Số lượng người lớn</div>
              <div className={cx("col-lg-3 fw-bold")}>
                <span>x</span>
                <span className={cx("mx-1")}>
                  {dataModalDetailBillBooking?.numberTicketAdult}
                </span>
              </div>
              <div className={cx("col-lg-3")}>Số lượng trẻ em</div>
              <div className={cx("col-lg-3 fw-bold")}>
                <span>x</span>
                <span className={cx("mx-1")}>
                  {dataModalDetailBillBooking?.numberTicketChild}
                </span>
              </div>
            </div>
          </div>
          <div className={cx("my-4")}></div>

          <div className={cx("ss3")}>
            <h4>Thông tin khách hàng</h4>
            <div className={cx("row")}>
              <div className={cx("col-lg-3")}>Họ và tên</div>
              <div className={cx("col-lg-3")}>
                <b>{Customer?.username}</b>
              </div>
              <div className={cx("col-lg-3")}>Số điện thoại</div>
              <div className={cx("col-lg-3")}>
                <b>{Customer?.phone}</b>
              </div>
            </div>
            <div className={cx("row my-1")}>
              <div className={cx("col-lg-3")}>Email</div> 
              <div className={cx("col-lg my-2")}>
                <b>{Customer?.email}</b>
              </div>
            </div>
          </div>
          <div className={cx("my-2")}></div>
          <div className={cx("ss4")}>
            <div className={cx("row  my-2")}>
              <div className={cx("col-lg-6")}>
                <div className={cx("d-flex fw-bold")}>
                  <div>Mã Voucher : </div>
                  <div className={cx("mx-1")}>{Voucher?.nameVoucher}</div>
                </div>
              </div>

              <div className={cx("col-lg-6")}>
                <div className={cx("d-flex")}>
                  <div className={cx("price")}>Thành giá tour: </div>
                  <b className={cx("money")}>
                    {Funtion.formatNumberWithCommas(
                      dataModalDetailBillBooking?.total_money
                    )}
                    <span className={cx("mx-1")}>vnd</span>
                  </b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <ModalBillPDF
        isShowModalBillPDF={isShowModalBillPDF}
        setIsShowModalBillPDF={setIsShowModalBillPDF}
        dataModalBillPDF={dataModalBillPDF}
        setDataModalBillPDF={setDataModalBillPDF}
      />
    </div>
  );
}

export default ModalDetailBillBooking;
