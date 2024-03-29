import className from "classnames/bind";
import styles from "./TourDetail.module.scss";
const cx = className.bind(styles);
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";

import { IconCheck } from "@tabler/icons-react";
import { InputNumber } from "antd";
import { useEffect, useMemo, useState } from "react";

import TourService from "../../services/TourService";
import functions from "../../components/Functions/function.js";

import ModalBookingTour from "./components/ModalBookingTour/index.jsx";

import {
  IconClockHour10,
  IconBus,
  IconZeppelin,
  IconShip,
} from "@tabler/icons-react";

function TourDetail() {
  const [tourDetail, setTourDetail] = useState({});
  const [calendarTour, setCalendarTour] = useState([]);
  const [processTour, setProcessTour] = useState({});
  let { id } = useParams();
  const [activeCalendar, setActiveCalendar] = useState({});

  const [isShowModalBookingTour, setIsShowModalBookingTour] = useState(false);

  const handleModalBookingTour = () => {
    setIsShowModalBookingTour(true);
  };

  const [numberTicketAdult, setNumberTicketAdult] = useState(1);
  const [numberTicketChild, setNumberTicketChild] = useState(0);

  const handleIconVehicle = (vehicle) => {
    if (vehicle == "xe") {
      return <IconBus />;
    } else if (vehicle == "bay") {
      return <IconZeppelin />;
    } else {
      return <IconShip />;
    }
  };

  // Gọi API lấy dữ liệu
  const getTourById = async () => {
    try {
      const res = await TourService.getTour(id);
      if (res && res.data.EC === 0 && res.data.DT.id) {
        setTourDetail(res?.data?.DT);
        setProcessTour(res?.data?.DT?.ProcessTour);
        setCalendarTour(
          res?.data?.DT?.Calendars?.map((item) => {
            return {
              ...item,
              isSelected: false,
            };
          })
        );
        setActiveCalendar(res?.data?.DT?.Calendars[0]);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getTourById();
  }, [id]);

  const handlActiveBorderCalendar = (item) => {
    setActiveCalendar(item);
    calendarTour?.map((calendar) => {
      calendar.isSelected = false;
      if (calendar.id === item.id) {
        calendar.isSelected = !calendar.isSelected;
      }
    });
  };

  //
  const handleNumberTicketAdult = (value) => {
    setNumberTicketAdult(value);
  };
  //
  const handleNumberTicketChild = (value) => {
    setNumberTicketChild(value);
  };

  // Tổng tiền
  const totalAmount = useMemo(() => {
    return (
      numberTicketAdult * activeCalendar?.priceAdult +
      numberTicketChild * activeCalendar?.priceChild
    );
  }, [numberTicketAdult, numberTicketChild, activeCalendar]); // Thêm adultTickets và childTickets vào dependency array

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container border")}>
        <div className={cx("nameTour")}>{tourDetail?.name}</div>
        <div className={cx("row ")}>
          {/* PROCESSTOUR */}
          <div className={cx("col-lg-8  p-0")}>
            <div>
              <div className={cx("bgTour")}>
                <div>
                  <img
                    src={tourDetail?.image}
                    alt="notFound"
                    className={cx("w-100", "imageTour")}
                  />

                  <div
                    className={cx(
                      "border d-flex justify-content-between py-2 mb-3",
                      "bge3e7ed"
                    )}
                  >
                    <div className={cx("mx-5")}>
                      <IconClockHour10 className={cx("mb-2")} /> 5 Ngày 4 Đêm
                    </div>
                    <div className={cx("mx-5")}>
                      Phương tiện : {handleIconVehicle(tourDetail?.vehicle)}
                    </div>
                  </div>
                </div>

                <div className={cx("desProcessTour", "bg-white")}>
                  <h1>Chương trình Tour</h1>
                  {processTour && processTour?.descriptionHTML && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: processTour.descriptionHTML,
                      }}
                      className={cx("desTour")}
                    ></div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* CALENDAR */}
          <div className={cx("col-lg-4 ")}>
            <div className={cx("calendar", "bg-white")}>
              <div className={cx("px-3 pt-3 ", "infoCalendar")}>
                <h5 className={cx("title")}>Lịch Trình và Giá Tour</h5>
                <div className={cx("mb-3")}>Chọn Lịch Trình và Xem Giá:</div>

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

                <div
                  className={cx(
                    "border d-flex  justify-content-between align-items-center rounded py-3 my-3 flex-wrap px-2"
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
                      max={100}
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
                      max={100}
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
                      {activeCalendar?.remainingSeats || 0}
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
                    <button
                      onClick={handleModalBookingTour}
                      className={cx("btnYeuCau")}
                    >
                      Đặt tour ngay
                    </button>
                  </div>
                </div>

                <div className={cx("  my-4")}>
                  <div className={cx("row g-3")}>
                    <div className={cx("col-lg-6")}>
                      <div className={cx("d-flex align-items-center")}>
                        <div>
                          <IconCheck className={cx("color_green")} />
                        </div>
                        <div className={cx("mx-2")}>Bảo hiểm</div>
                      </div>
                    </div>
                    <div className={cx("col-lg-6")}>
                      <div className={cx("d-flex align-items-center")}>
                        <div>
                          <IconCheck className={cx("color_green")} />
                        </div>
                        <div className={cx("mx-2")}>Bữa ăn</div>
                      </div>
                    </div>
                    <div className={cx("col-lg-6")}>
                      <div className={cx("d-flex align-items-center")}>
                        <div>
                          <IconCheck className={cx("color_green")} />
                        </div>
                        <div className={cx("mx-2")}>Hướng dẫn viên</div>
                      </div>
                    </div>
                    <div className={cx("col-lg-6")}>
                      <div className={cx("d-flex align-items-center")}>
                        <div>
                          <IconCheck className={cx("color_green")} />
                        </div>
                        <div className={cx("mx-2")}>Khách sạn 4-5*</div>
                      </div>
                    </div>
                    <div className={cx("col-lg-6")}>
                      <div className={cx("d-flex align-items-center")}>
                        <div>
                          <IconCheck className={cx("color_green")} />
                        </div>
                        <div className={cx("mx-2")}>Vé tham quan</div>
                      </div>
                    </div>
                    <div className={cx("col-lg-6")}>
                      <div className={cx("d-flex align-items-center")}>
                        <div>
                          <IconCheck className={cx("color_green")} />
                        </div>
                        <div className={cx("mx-2")}>Xe đưa đón</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalBookingTour
        isShowModalBookingTour={isShowModalBookingTour}
        setIsShowModalBookingTour={setIsShowModalBookingTour}
        tourDetail={tourDetail}
        setTourDetail={setTourDetail}
        activeCalendar={activeCalendar}
        numberTicketAdult={numberTicketAdult}
        numberTicketChild={numberTicketChild}
        totalAmount={totalAmount}
      />
    </div>
  );
}

export default TourDetail;
