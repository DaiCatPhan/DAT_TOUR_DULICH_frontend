import className from "classnames/bind";
import styles from "./ModalMoreCalendar.module.scss";
const cx = className.bind(styles);

import { toast } from "react-toastify";
import { Button, Modal } from "antd";
import moment from "moment";
import functions from "../../../../components/Functions/function";
import { InputNumber } from "antd";

import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import ModalBookingTour from "../ModalBookingTour";

function ModalMoreCalendar(props) {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

  const {
    isShowModalMoreCalendar,
    setIsShowModalMoreCalendar,
    calendarTour,
    handleGetMoreCalendar,
  } = props;

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [activeCalendar, setActiveCalendar] = useState({});
  const [numberTicketAdult, setNumberTicketAdult] = useState(1);
  const [numberTicketChild, setNumberTicketChild] = useState(0);

  const handleOk = () => {};
  const handleCancel = () => {
    setIsShowModalMoreCalendar(false);
  };

  const handlActiveBorderCalendar = (item) => {
    setActiveCalendar(item);
    calendarTour?.map((calendar) => {
      calendar.isSelected = false;
      if (calendar.id === item.id) {
        calendar.isSelected = !calendar.isSelected;
      }
    });
  };

  const handleNumberTicketAdult = (value) => {
    setNumberTicketAdult(value);
  };

  const handleNumberTicketChild = (value) => {
    setNumberTicketChild(value);
  };

  const totalAmount = useMemo(() => {
    return (
      numberTicketAdult * activeCalendar?.priceAdult +
      numberTicketChild * activeCalendar?.priceChild
    );
  }, [numberTicketAdult, numberTicketChild, activeCalendar]);

  const handleModalBookingTour = () => {
    const data = {
      activeCalendar: activeCalendar,
      numberTicketAdult: numberTicketAdult,
      numberTicketChild: numberTicketChild,
      totalAmount: totalAmount,
    };
    handleGetMoreCalendar(data);
  };

  return (
    <div className={cx("wrapper")}>
      <Modal
        title="Chi tiết tất cả các lịch"
        open={isShowModalMoreCalendar}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={800}
        footer={null}
      >
        <div>
          <div className={cx("row ")}>
            <div className={cx("col-lg-6 ")}>
              <div className={cx("row")}>
                {calendarTour?.map((item) => {
                  return (
                    <div className={cx("col-lg-4")} key={item?.id}>
                      <div
                        onClick={() => handlActiveBorderCalendar(item)}
                        className={
                          item.id === activeCalendar.id
                            ? cx("calendarCard", "date", "active")
                            : cx("calendarCard", "date")
                        }
                      >
                        {moment(item?.startDay).format("DD/MM")}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={cx("col-lg-6 p-0")}>
              <div className={cx("ss2")}>
                <div
                  className={cx(
                    "border   d-flex  justify-content-between align-items-center rounded py-3   flex-wrap px-2"
                  )}
                >
                  <div>Người lớn</div>
                  <div className={cx("text-warning ", "fse_20")}>
                    <span className={cx("mx-2")}>x</span>
                    {functions.formatNumberWithCommas(
                      activeCalendar?.priceAdult || 0
                    )}
                  </div>

                  <div>
                    <InputNumber
                      min={1}
                      max={activeCalendar?.remainingSeats}
                      defaultValue={1}
                      onChange={handleNumberTicketAdult}
                    />
                  </div>
                </div>

                <div
                  className={cx(
                    "border d-flex  justify-content-between align-items-center rounded py-3 my-3 flex-wrap px-2"
                  )}
                >
                  <div className={cx("mr_20")}>Trẻ em </div>
                  <div className={cx("text-warning ", "fse_20")}>
                    <span className={cx("mx-2")}>x</span>
                    {functions.formatNumberWithCommas(
                      activeCalendar?.priceChild || 0
                    )}
                  </div>

                  <div>
                    <InputNumber
                      min={0}
                      max={activeCalendar?.remainingSeats - numberTicketAdult}
                      defaultValue={0}
                      onChange={handleNumberTicketChild}
                    />
                  </div>
                </div>

                <div className={cx("d-flex my-3  ")}>
                  <div></div>
                  <div
                    className={cx(
                      "xanhBlueMo",
                      "d-flex justify-content-between  w-100 align-items-center"
                    )}
                  >
                    <div>Liên hệ để xác nhận chỗ</div>
                    <div className={cx("fs-4")}>
                      {activeCalendar?.remainingSeats == 0 ? (
                        <div>Hết chỗ</div>
                      ) : (
                        <div>{activeCalendar?.remainingSeats}</div>
                      )}
                    </div>
                  </div>
                </div>

                <div
                  className={cx(
                    "d-flex align-items-center justify-content-between my-3"
                  )}
                >
                  <div>Tổng Giá Tour</div>
                  <div className={cx("fs-4", "text-warning", "fw_600")}>
                    {functions.formatNumberWithCommas(totalAmount || 0)}
                    <span className={cx("mx-2")}>VND</span>
                  </div>
                </div>

                <div className={cx("d-flex justify-content-between")}>
                  <div>
                    <button className={cx("btnLienHe")}>Liên hệ tư vấn</button>
                  </div>
                  <div>
                    {activeCalendar?.remainingSeats == 0 ? (
                      <button
                        onClick={handleModalBookingTour}
                        className={cx("btnYeuCau", "disable")}
                        disabled={true}
                      >
                        Đặt tour ngay
                      </button>
                    ) : (
                      <button
                        onClick={handleModalBookingTour}
                        className={cx("btnYeuCau")}
                      >
                        Đặt tour ngay
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalMoreCalendar;
