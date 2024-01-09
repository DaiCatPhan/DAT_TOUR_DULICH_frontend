import className from "classnames/bind";
import styles from "./TourDetail.module.scss";
const cx = className.bind(styles);

function TourDetail() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container row vh-100")}>
        <div className={cx('col-lg-8')}>
            <div className={cx('bgTour')}>
                <div></div>
                <div></div>
            </div>
            <div className={cx('desTour')}></div>
            <div className={cx('processTour')}></div>
            <div className={cx('calendar')}></div>
            <div className={cx('replaceTours')}></div>
        </div>
        <div className={cx('col-lg')}>
            <div className={cx('calendarAndPrice')}></div>
        </div>
      </div>
    </div>
  );
}

export default TourDetail;
