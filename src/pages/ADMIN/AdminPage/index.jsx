import className from "classnames/bind";
import styles from "./AdminHomePage.module.scss";
const cx = className.bind(styles);

import { IconBriefcase2 } from "@tabler/icons-react";
import { IconMapPin } from "@tabler/icons-react";

function AdminHomePage() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("row   ", "bodyWrapper")}>
        <div className={cx("col-lg-6  ")}>
          <div className={cx("col_left")}>
            <div className={cx("item1")}>
              <button className={cx("btn btn-warning text-white")}>
                Du lịch mọi nơi
              </button>
              <img
                width={30}
                height={30}
                src="/src/assets/Admin/traidat.webp"
                alt="notFound"
                className={cx("mx-3")}
              />
            </div>
            <div className={cx("item2")}>
              Du lịch mở ra cơ hội tạo ra những
              <span className={cx("text-warning mx-2")}>kỷ niệm</span>
            </div>
            <div className={cx("item3")}>
              <b>Điểm đến du lịch</b>: Khám phá về các địa điểm du lịch phổ biến
              trên thế giới như Đạt lạt, Phú Quốc, Nha Trang và nhiều nơi
              khác. Mỗi địa điểm đều có những điểm đến hấp dẫn riêng, với lịch
              sử, văn hóa, và danh lam thắng cảnh độc đáo.
            </div>
            <div className={cx("item4")}>
              <b>Ẩm thực</b>: Khám phá văn hóa ẩm thực đặc trưng của các quốc
              gia và khu vực, từ món ăn đường phố đến ẩm thực cao cấp.
            </div>
            <div className={cx("item5")}>
              <b>Lịch sử và văn hóa</b>: Tìm hiểu về lịch sử và văn hóa địa
              phương thông qua các tour tham quan di tích, bảo tàng, lễ hội và
              sự kiện đặc biệt.
            </div>
          </div>
        </div>
        <div className={cx("col-lg-6  ")}>
          <div className={cx("col_right")}>
            <div className={cx("item1")}>
              <img src="/src/assets/Admin/home/2.jpg" alt="notFound" />
            </div>

            <div className={cx("item2")}>
              <img src="/src/assets/Admin/home/4.jpg" alt="notFound" />
            </div>

            <div className={cx("item3")}>
              <img src="/src/assets/Admin/home/3.jpg" alt="notFound" />
            </div>
          </div>
        </div>
      </div>
      <div className={cx("row")}>
        <div className={cx("col-lg-7")}>
          <div className={cx("card")}>
            <div className={cx("item", "item1")}>
              <div className={cx("mx-2")}>
                <IconMapPin color="orange" />
              </div>
              <div>
                <div>
                  <b>Location</b>
                </div>
                <div>Where ara you going</div>
              </div>
            </div>

            <div className={cx("item")}>
              <div className={cx("mx-2")}>
                <IconMapPin color="orange" />
              </div>
              <div>
                <div>
                  <b>Distance</b>
                </div>
                <div>Distance km/h</div>
              </div>
            </div>

            <div className={cx("item", "item3")}>
              <div className={cx("mx-2")}>
                <IconMapPin color="orange" />
              </div>
              <div>
                <div>
                  <b>Max people</b>
                </div>
                <div className={cx("text-center")}>0</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHomePage;
