import className from "classnames/bind";
import styles from "./TourDetail.module.scss";
const cx = className.bind(styles);
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";

import { IconCheck, IconCalendarCheck } from "@tabler/icons-react";
import { InputNumber } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import TourService from "../../services/TourService";
import CommentService from "../../services/CommentService.js";
import functions from "../../components/Functions/function.js";

import ModalBookingTour from "./components/ModalBookingTour/index.jsx";
import ModalMoreCalendar from "./components/ModalMoreCalendar";

import {
  IconClockHour10,
  IconBus,
  IconZeppelin,
  IconShip,
} from "@tabler/icons-react";
import { Rate } from "antd";
import { Progress } from "antd";
import { useSelector } from "react-redux";

function TourDetail() {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const [tourDetail, setTourDetail] = useState({});
  const [calendarTour, setCalendarTour] = useState([]);
  const [commentTour, setCommentTour] = useState([]);
  const [processTour, setProcessTour] = useState({});
  let { id } = useParams();
  const navigate = useNavigate();
  const [activeCalendar, setActiveCalendar] = useState({});
  const [isShowModalBookingTour, setIsShowModalBookingTour] = useState(false);

  const [isShowModalMoreCalendar, setIsShowModalMoreCalendar] = useState(false);
  const handleModalMoreCalendar = () => {
    setIsShowModalMoreCalendar(true);
  };

  const handleModalBookingTour = () => {
    if (!isAuthenticated) {
      toast.error("Vui lòng đăng nhập để đặt tour");
      return;
    }
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

  const getTourById = async () => {
    try {
      const res = await TourService.getTour(
        `id=${id}&sortStartDayCalendar=ASC&getAll=false&statusCalendar=1`
        // `id=${id}&sortStartDayCalendar=ASC&numberCalenadar=3&getAll=false&statusCalendar=1`
      );
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

  const getCommentTourById = async () => {
    try {
      const res = await CommentService.review(`ID_Tour=${id}&show=1`);

      if (res && res.data.EC === 0) {
        setCommentTour(res.data.DT[0]);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getTourById();
    getCommentTourById();
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

  const handleNumberTicketAdult = (value) => {
    setNumberTicketAdult(value);
  };

  const handleNumberTicketChild = (value) => {
    setNumberTicketChild(value);
  };

  let totalAmount = useMemo(() => {
    return (
      numberTicketAdult * activeCalendar?.priceAdult +
      numberTicketChild * activeCalendar?.priceChild
    );
  }, [numberTicketAdult, numberTicketChild, activeCalendar]);

  const handleDuration = (day, night) => {
    if (day === 1 && night === 0) {
      return <div>Trong ngày</div>;
    } else {
      return (
        <div>
          <span>{day}</span>
          <span className={cx("mx-1")}>ngày</span>
          <span>{night}</span>
          <span className={cx("mx-1")}>đêm</span>
        </div>
      );
    }
  };

  const handleGetMoreCalendar = (data) => {
    setActiveCalendar(data.activeCalendar);
    setNumberTicketAdult(data.numberTicketAdult);
    setNumberTicketChild(data.numberTicketChild);
    totalAmount = data.totalAmount;
    setIsShowModalBookingTour(true);
    setIsShowModalMoreCalendar(false);
  };

  const handleChat = () => {
    if (!isAuthenticated) {
      toast.error("Vui lòng đăng nhập để được liên hệ chat");
      return;
    }
    navigate("/user/message");
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
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
                      "bg-white  d-flex justify-content-between py-2 mb-3",
                      "bd_f79321"
                    )}
                  >
                    <div className={cx("mx-5 d-flex")}>
                      <div>
                        <IconClockHour10 className={cx("mb-2")} />
                      </div>
                      <div className={cx("mx-1")}>
                        {handleDuration(
                          tourDetail?.numbeOfDay,
                          tourDetail?.numberOfNight
                        )}
                      </div>
                    </div>
                    <div>
                      Phương tiện : {handleIconVehicle(tourDetail?.vehicle)}
                    </div>
                    <div className={cx("mx-5")}>MÃ TOUR : {tourDetail?.id}</div>
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
            {/* REVIEW */}
            <div className={cx("review")}>
              <div className={cx("row")}>
                <div className={cx("col-lg-6")}>
                  <div className={cx("item1")}>
                    <div className={cx("view")}>
                      <div className={cx("item")}>
                        {commentTour?.review?.averageNumberOfStars?.toFixed(
                          1
                        ) || 0}
                      </div>
                      <div className={cx("item")}>
                        <Rate
                          value={+commentTour?.review?.averageNumberOfStars}
                          allowHalf
                        />
                      </div>
                      <div className={cx("item")}>
                        {commentTour?.review?.totalNumberReView} lượt đánh giá
                      </div>
                    </div>
                  </div>
                </div>

                <div className={cx("col-lg-6")}>
                  <div className={cx("item2")}>
                    <div className={cx("d-flex")}>
                      <div className={cx("mx-1")}>5</div>
                      <Progress
                        percent={
                          (
                            commentTour?.review?.numberReview5Star /
                            commentTour?.review?.totalNumberReView
                          )?.toFixed(2) * 100
                        }
                        status="active"
                      />
                    </div>
                    <div>
                      <div className={cx("d-flex")}>
                        <div className={cx("mx-1")}>4</div>
                        <Progress
                          percent={
                            (
                              commentTour?.review?.numberReview4Star /
                              commentTour?.review?.totalNumberReView
                            )?.toFixed(2) * 100
                          }
                          status="active"
                        />
                      </div>
                    </div>

                    <div>
                      <div className={cx("d-flex")}>
                        <div className={cx("mx-1")}>3</div>
                        <Progress
                          percent={
                            (
                              commentTour?.review?.numberReview3Star /
                              commentTour?.review?.totalNumberReView
                            )?.toFixed(2) * 100
                          }
                          status="active"
                        />
                      </div>
                    </div>

                    <div>
                      <div className={cx("d-flex")}>
                        <div className={cx("mx-1")}>2</div>
                        <Progress
                          percent={
                            (
                              commentTour?.review?.numberReview2Star /
                              commentTour?.review?.totalNumberReView
                            )?.toFixed(2) * 100
                          }
                          status="active"
                        />
                      </div>
                    </div>

                    <div>
                      <div className={cx("d-flex")}>
                        <div className={cx("mx-1")}>1</div>
                        <Progress
                          percent={
                            (
                              commentTour?.review?.numberReview1Star /
                              commentTour?.review?.totalNumberReView
                            )?.toFixed(2) * 100
                          }
                          status="active"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* LIST COMMMENT */}
            <div className={cx("comments")}>
              <div>
                {commentTour?.commentTour?.map((item) => {
                  return (
                    <div className={cx("cardComment")} key={item.id}>
                      <div>
                        <div className={cx("name")}>
                          {item?.Customer?.username}
                        </div>
                        <div className={cx("d-flex")}>
                          <div className={cx("number")}>{item?.star}</div>
                          <div>
                            <Rate
                              allowHalf
                              disabled
                              value={item?.star}
                              className={cx("star")}
                            />
                          </div>
                        </div>
                      </div>
                      <div className={cx("content")}>{item?.content}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* CALENDAR */}
          <div className={cx("col-lg-4 ")}>
            <div className={cx("calendar", "bg-white")}>
              <div className={cx("px-3 pt-3 ", "infoCalendar")}>
                <h5 className={cx("title")}>Lịch Trình và Giá Tour</h5>
                <div className={cx("iconMore")}>
                  <div>Chọn Lịch Trình và Xem Giá:</div>
                  <div className={cx("iconM")}>
                    <IconCalendarCheck onClick={handleModalMoreCalendar} />
                  </div>
                </div>

                <div className={cx("row")}>
                  {calendarTour.slice(0, 3)?.map((item) => {
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
                    <button className={cx("btnLienHe")} onClick={handleChat}>
                      Liên hệ tư vấn
                    </button>
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
        getTourById={getTourById}
      />
      <ModalMoreCalendar
        isShowModalMoreCalendar={isShowModalMoreCalendar}
        setIsShowModalMoreCalendar={setIsShowModalMoreCalendar}
        calendarTour={calendarTour}
        handleGetMoreCalendar={handleGetMoreCalendar}
      />
    </div>
  );
}

export default TourDetail;
