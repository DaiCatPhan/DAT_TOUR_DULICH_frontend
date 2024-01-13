import className from "classnames/bind";
import styles from "./TourDetail.module.scss";
const cx = className.bind(styles);

import { IconCheck } from "@tabler/icons-react";
import { InputNumber } from "antd";

function TourDetail() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container ")}>
        <div className={cx("row  ")}>
          <div className={cx("col-lg-8  p-0")}>
            <div className={cx("border border-primary  ", "mr_3")}>
              <div className={cx("bgTour")}>
                <div>
                  <img
                    src="https://cdn2.ivivu.com/2023/11/22/11/ivivu-miracle-garden-dubai-dubai-750x390.jpg"
                    alt="notFound"
                    className={cx("w-100")}
                  />
                </div>
                <div></div>
              </div>
              <div className={cx("bgTour")}>
                <div>
                  <img
                    src="https://cdn2.ivivu.com/2023/11/22/11/ivivu-miracle-garden-dubai-dubai-750x390.jpg"
                    alt="notFound"
                    className={cx("w-100")}
                  />
                </div>
                <div></div>
              </div>
              <div className={cx("bgTour")}>
                <div>
                  <img
                    src="https://cdn2.ivivu.com/2023/11/22/11/ivivu-miracle-garden-dubai-dubai-750x390.jpg"
                    alt="notFound"
                    className={cx("w-100")}
                  />
                </div>
                <div></div>
              </div>
              <div className={cx("bgTour")}>
                <div>
                  <img
                    src="https://cdn2.ivivu.com/2023/11/22/11/ivivu-miracle-garden-dubai-dubai-750x390.jpg"
                    alt="notFound"
                    className={cx("w-100")}
                  />
                </div>
                <div></div>
              </div>
              <div className={cx("desTour")}></div>
              <div className={cx("processTour")}></div>
              <div className={cx("calendar")}></div>
              <div className={cx("replaceTours")}></div>
            </div>
          </div>

          {/* CALENDAR */}
          <div
            className={cx(
              "col-lg-4 border border-danger p-0 bg-white",
              "calendar"
            )}
          >
            <div className={cx("px-3 pt-3", "infoCalendar")}>
              <h5 className={cx("title")}>Lịch Trình và Giá Tour</h5>
              <div className={cx("mb-3")}>Chọn Lịch Trình và Xem Giá:</div>

              <div className={cx("d-flex justify-content-between border my-4")}>
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
                <div className={cx("xanhBlueMo")}>Liên hệ để xác nhận chỗ</div>
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
  );
}

export default TourDetail;
