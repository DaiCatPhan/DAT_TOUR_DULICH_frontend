import className from "classnames/bind";
import styles from "./CardSearch.module.scss";
const cx = className.bind(styles);

import {
  IconClockHour10,
  IconBus,
  IconZeppelin,
  IconShip,
} from "@tabler/icons-react";

function CardSearch(props) {
  const { item } = props;
  return (
    <div className={cx("wrapper")}>
      <div className={cx("row bg-white my-3")}>
        <div className={cx("col-lg-3   p-0 ")}>
          <img
            src="https://cdn2.ivivu.com/2023/10/04/16/ivivu-wat-yansangwararam-204x153.jpg"
            alt="notFound"
            className={cx("w-100 p-1 rounded")}
            height={140}
          />
        </div>
        <div className={cx("col-lg-9")}>
          <div className={cx("row p-2")}>
            <div className={cx("col-lg-8  ")}>
              <h5>
                Tour Thái Lan 5N4Đ: Hà Nội - Bangkok - Pattaya - Đảo Coral -
                Show Alcazar - Baiyoke Sky (Bay VietJet Air Trưa)
              </h5>
              <div className={cx("d-flex justify-content-between ")}>
                <div>Mã : TO1644</div>
                <div
                  className={cx(
                    "d-flex justify-content-between align-items-center "
                  )}
                >
                  <div>
                    <IconClockHour10 />
                  </div>
                  <div className={cx("mx-2")}> 2 ngày 1 đêm</div>
                </div>
                <div>
                  Phương tiện : <IconBus />
                </div>
              </div>
            </div>
            <div className={cx("col-lg mt-3")}>
              <div>Khởi hành: 16-01-2024</div>
              <h4 className={cx("price")}>
                1.500.000 <span>VND</span>
              </h4>
              <div>Khởi hành: 16-01-2024</div>
            </div>
          </div>
        </div>
      </div>
       
    </div>
  );
}

export default CardSearch;
