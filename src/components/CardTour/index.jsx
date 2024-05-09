import className from "classnames/bind";
import styles from "./CardTour.module.scss";
const cx = className.bind(styles);

import {
  IconBus,
  IconClockHour3,
  IconZeppelin,
  IconShip,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

import Function from "../Functions/function";

function CardTour(props) {
  const { item } = props;
  console.log("item >>", item);
  const { image, name, duration, priceAdult } = item;
  const handleIconVehicle = (vehicle) => {
    if (vehicle == "xe") {
      return <IconBus />;
    } else if (vehicle == "bay") {
      return <IconZeppelin />;
    } else {
      return <IconShip />;
    }
  };

  const handleDuration = (day, night) => {
    if (day === 1 && night === 0) {
      return <div>Trong ngày</div>;
    } else {
      return (
        <div>
          <span>{day}</span>
          <span className={cx("mx-1")}>ngày</span>
          <span>{night}</span>
          <span className={cx("mx-1")}>đêm</span>
        </div>
      );
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("cardTour", "rounded")}>
        <img src={image} alt="notfound" />
        <div className={cx("content", "p-2", "bg-white")}>
          <p className={cx("color-text", "title")}>
            <b>{item?.name}</b>
          </p>
          <div className={cx("d-flex justify-content-between pb-2")}>
            <div className={cx("d-flex align-items-center")}>
              <div>
                <IconClockHour3 />
              </div>
              <div className={cx("mx-1")}>
                {handleDuration(item?.numbeOfDay, item?.numberOfNight)}
              </div>
            </div>
            <div>{handleIconVehicle(item?.vehicle)}</div>
          </div>

          <div className={cx("d-flex justify-content-between py-2")}>
            <div></div>
            <h5 className={cx("price")}>
              <span>{Function?.formatNumberWithCommas(priceAdult)}</span>
              <span className={cx("fs-6 mx-1")}>VND</span>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardTour;
