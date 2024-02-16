import className from "classnames/bind";
import styles from "./TourDetail.module.scss";
const cx = className.bind(styles);
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  IconClockHour10,
  IconBus,
  IconZeppelin,
  IconShip,
} from "@tabler/icons-react";

import { IconCheck } from "@tabler/icons-react";
import { InputNumber } from "antd";
import { useEffect, useState } from "react";

import TourService from "../../services/TourService";

function TourDetail() {
  const [tourDetail, setTourDetail] = useState({});
  const [calendarTour, setCalendarTour] = useState([]);
  const [processTour, setProcessTour] = useState({});
  const id = 13;

  const handleIconVehicle = (vehicle) => {
    if (vehicle === "xed") {
      return <IconBus />;
    } else if (vehicle === "bay") {
      return <IconZeppelin />;
    } else {
      return <IconShip />;
    }
  };

  // Gọi API lấy dữ liệu
  const getTourById = async () => {
    try {
      const res = await TourService.getTour(id);
      console.log("res >>>>>>", res);
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
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getTourById();
  }, [id]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container border")}>
        <h2 className={cx("w-80", "my-3")}>
          Tour Châu Đốc 1N1Đ: Viếng Bà - Miếu Bà Chúa Xứ Bàu Mướp - Núi Cấm
        </h2>
        <div className={cx("row  ")}>
          <div className={cx("col-lg-8  p-0")}>
            <div>
              <div className={cx("bgTour")}>
                <div>
                  <img
                    src="https://cdn2.ivivu.com/2023/11/22/11/ivivu-miracle-garden-dubai-dubai-750x390.jpg"
                    alt="notFound"
                    className={cx("w-100")}
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

              <div className={cx("processTour")}></div>
              <div className={cx("calendar")}></div>
              <div className={cx("replaceTours")}></div>
            </div>
          </div>
          {/* CALENDAR */}
          <div className={cx("col-lg-4 ")}>
            <div className={cx("calendar", "bg-white")}>
              <div className={cx("px-3 pt-3 ", "infoCalendar")}>
                <h5 className={cx("title")}>Lịch Trình và Giá Tour</h5>
                <div className={cx("mb-3")}>Chọn Lịch Trình và Xem Giá:</div>

                <div
                  className={cx("d-flex justify-content-between border my-4")}
                >
                  <div
                    className={cx(
                      "d-flex justify-content-center align-items-center   "
                    )}
                  >
                    <div className={cx("calendarCard", "date", "active")}>
                      18/01
                    </div>
                  </div>
                </div>

                <div
                  className={cx(
                    "border d-flex  justify-content-between align-items-center rounded py-3 my-3 flex-wrap px-2"
                  )}
                >
                  <div>Người lớn</div>
                  <div>x 30.000.000</div>

                  <div>
                    <InputNumber
                      min={1}
                      max={10}
                      defaultValue={1}
                      // onChange={onChange}
                    />
                  </div>
                </div>
                <div
                  className={cx(
                    "border d-flex  justify-content-between align-items-center rounded py-3 my-3 flex-wrap px-2"
                  )}
                >
                  <div>Trẻ em</div>
                  <div className={cx("text-warning ", "fw_600")}>
                    x 30.000.000
                  </div>
                  <div>
                    <InputNumber
                      min={0}
                      max={10}
                      defaultValue={0}
                      // onChange={onChange}
                    />
                  </div>
                </div>

                <div className={cx("d-flex my-3  ")}>
                  <div></div>
                  <div className={cx("xanhBlueMo")}>
                    Liên hệ để xác nhận chỗ
                  </div>
                </div>

                <div
                  className={cx(
                    "d-flex align-items-center justify-content-between my-3"
                  )}
                >
                  <div>Tổng Giá Tour</div>
                  <div className={cx("fs-4", "text-warning", "fw_600")}>
                    61.000.000 <span>VND</span>
                  </div>
                </div>

                <div className={cx("d-flex justify-content-between")}>
                  <div>
                    <button className={cx("btnLienHe")}>Liên hệ tư vấn</button>
                  </div>
                  <div>
                    <button className={cx("btnYeuCau")}>Đặt tour ngay</button>
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
    </div>
  );
}

export default TourDetail;
