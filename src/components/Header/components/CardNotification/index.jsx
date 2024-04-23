import className from "classnames/bind";
import styles from "./CardNotification.module.scss";
const cx = className.bind(styles);

function CardNotification() {
  return (
    <div className={cx("wrapper")}>

      <div className={cx("card")}>
        <div className={cx("row")}>
          <div className={cx("col-lg-9")}>
            <div className={cx("title")}>
              <b>
                Thông báo chuyển tour Thông báo chuyển tour Thông báo chuyển
                tour
              </b>
            </div>
          </div>
          <div className={cx("col-lg-3")}>
            <div>23/12/2024</div>
          </div>
        </div>

        <div className={cx("content")}>
          Lorem exercitationem obcaecati voluptatem. Lorem exercitationem
          obcaecati voluptatem. Lorem exercitationem obcaecati voluptatem. Lorem
          exercitationem obcaecati voluptatem.
        </div>
      </div>

      <div className={cx("card")}>
        <div className={cx("row")}>
          <div className={cx("col-lg-9")}>
            <div className={cx("title")}>
              <b>
                Thông báo chuyển tour Thông báo chuyển tour Thông báo chuyển
                tour
              </b>
            </div>
          </div>
          <div className={cx("col-lg-3")}>
            <div>23/12/2024</div>
          </div>
        </div>

        <div className={cx("content")}>
          Lorem exercitationem obcaecati voluptatem. Lorem exercitationem
          obcaecati voluptatem. Lorem exercitationem obcaecati voluptatem. Lorem
          exercitationem obcaecati voluptatem.
        </div>
      </div>
      
    </div>
  );
}

export default CardNotification;
