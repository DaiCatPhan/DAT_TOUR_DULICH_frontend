import className from "classnames/bind";
import styles from "./TourViewed.module.scss";
const cx = className.bind(styles);

function TourViewed(props) {
  const { nameTour, price, image } = props;
  return (
    <div className={cx("   rounded ", "TourSeened")}>
      <div className={cx("row")}>
        <div className={cx("col-lg-4 p-0")}>
          <img src={image} alt="notFound" className={cx("w-100 h-100")} />
        </div>
        <div className={cx("col-lg-8 px-3")}>
          <div className={cx("colorTitle", "my-2",'textResidual')}>{nameTour || ""}</div>
          <div className={cx("d-flex justify-content-between")}>
            <div></div>
            <p className={cx("colorPrice")}>
              {price || 0} <span>VND</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourViewed;
