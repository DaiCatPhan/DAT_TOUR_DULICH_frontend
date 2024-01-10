import className from "classnames/bind";
import styles from "./CardTour.module.scss";
const cx = className.bind(styles);

import { IconBus, IconClockHour3 } from "@tabler/icons-react";

function CardTour() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("cardTour")}>
        <img
          src="https://cdn2.ivivu.com/2023/07/13/16/ivivu-wiang-kum-kam-chiang-mai-360x225.jpg"
          alt="notfound"
        />
        <div className={cx("content", "p-2", "bg-white")}>
          <p className={cx("color-text", "title")}>
            <b>
              Tour Malaysia - Singapore 5N4Đ: TP.HCM - Kualar Lumpur - Singapore
              Tết Ta Tour Malaysia - Singapore 5N4Đ: TP.HCM - Kualar Lumpur{" "}
            </b>
          </p>
          <div className={cx("d-flex justify-content-between pb-2")}>
            <div className={cx("d-flex align-items-center")}>
              <div>
                <IconClockHour3 />
              </div>
              <div>5 ngay 4 dem</div>
            </div>
            <div>
              <IconBus />
            </div>
          </div>
          <div>
            <div className={cx("listAddress")}>
              <div>
                <li className={cx("fse-sm", "textHandle")}>
                  Quảng trường hà lan
                </li>
              </div>
              <div>
                <li className={cx("fse-sm")}>Quảng trường hà lan</li>
              </div>
              <div>
                <li className={cx("fse-sm")}>Quảng trường hà lan</li>
              </div>
              <div>
                <li className={cx("fse-sm")}>Quảng trường hà lan</li>
              </div>
            </div>
          </div>
          <div className={cx("d-flex justify-content-between py-2")}>
            <div></div>
            <h5 className={cx("price")}>
              15.990.000 <span className={cx("fs-6")}>VND</span>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardTour;
