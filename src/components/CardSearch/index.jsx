import className from "classnames/bind";
import styles from "./CardSearch.module.scss";
const cx = className.bind(styles);

function CardSearch() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("border row")}>
        <div className={cx("col-lg-3 border p-0 ")}>
          <img
            src="https://cdn2.ivivu.com/2023/10/04/16/ivivu-wat-yansangwararam-204x153.jpg"
            alt="notFound"
            className={cx("w-100 h-100")}
          />
        </div>
        <div className={cx("col-lg")}>
          <div className={cx("row p-2")}>
            <div className={cx("col-lg-8  ")}>
              <h5>
                Tour Thái Lan 5N4Đ: Hà Nội - Bangkok - Pattaya - Đảo Coral -
                Show Alcazar - Baiyoke Sky (Bay VietJet Air Trưa)
              </h5>
              <div className={cx("d-flex justify-content-between my-2")}>
                <div>Mã : TO1644</div>
                <div>2 ngày 1 đêm</div>
                <div>Phương tiện</div>
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
            </div>
            <div className={cx("col-lg")}>
              <div>Khởi hành: 16-01-2024</div>
              <h4 className={cx('price')}>1.500.000 <span>VND</span></h4>
              <div>Khởi hành: 16-01-2024</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardSearch;
