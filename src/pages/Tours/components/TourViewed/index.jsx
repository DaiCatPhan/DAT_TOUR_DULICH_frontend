import className from "classnames/bind";
import styles from "./TourViewed.module.scss";
const cx = className.bind(styles);

import { IconX } from "@tabler/icons-react";
import functions from "../../../../components/Functions/function";
import ViewedService from "../../../../services/ViewedService";
function TourViewed(props) {
  const { item, getToursViewded } = props;
  const { name, priceAdult, image } = item?.Tour;
  const handleDeleteTourSeened = async () => {
    const dataSend = {
      id: item?.id,
      table: "ViewedTour",
    };
    const res = await ViewedService.deleteViewed(dataSend);
    if (res && res.data.EC === 0) {
      getToursViewded();
    }
  };
  return (
    <div className={cx("TourSeened")}>
      <IconX onClick={handleDeleteTourSeened} className={cx("iconDelete")} />
      <div className={cx("row")}>
        <div className={cx("col-lg-4")}>
          <img src={image} alt="notFound" className={cx("imageTourSeened")} />
        </div>
        <div className={cx("col-lg-8")}>
          <div className={cx("colorTitle")}>{name}</div>
          <div
            className={cx(
              "d-flex justify-content-between mx-2 mt-2 align-items-center"
            )}
          >
            <div></div>
            <p className={cx("colorPrice", "color_00c1de")}>
              {functions.formatNumberWithCommas(priceAdult) || 0}
              <span>VND</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourViewed;
