import className from "classnames/bind";
import styles from "./CardSearch.module.scss";
const cx = className.bind(styles);

import funtions from "../../components/Functions/function";

import {
  IconClockHour10,
  IconBus,
  IconZeppelin,
  IconShip,
} from "@tabler/icons-react";
import moment from "moment";

function CardSearch(props) {
  const { item } = props;
  const {
    name,
    image,
    priceAdult,
    id,
    numbeOfDay,
    numberOfNight,
    vehicle,
    Calendars,
  } = item;

  console.log("item ", item);
  const handleIconVehicle = (vehicle) => {
    if (vehicle == "xe") {
      return <IconBus />;
    } else if (vehicle == "bay") {
      return <IconZeppelin />;
    } else {
      return <IconShip />;
    }
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("row bg-white my-3")}>
        <div className={cx("col-lg-3   p-0 ")}>
          <img
            src={image}
            alt="notFound"
            className={cx("w-100 p-1 rounded")}
            height={140}
          />
        </div>
        <div className={cx("col-lg-9")}>
          <div className={cx("row p-2")}>
            <div className={cx("col-lg-8  ")}>
              <div>
                <h5 className={cx("nameTour")}>{name}</h5>
                <div className={cx("d-flex justify-content-between")}>
                  <div className={cx("color_616161")}>Mã : {id}</div>
                  <div
                    className={cx(
                      "d-flex justify-content-between align-items-center "
                    )}
                  >
                    <div>
                      <IconClockHour10 className={cx("color_616161")} />
                    </div>
                    <div className={cx("mx-2", "color_616161")}>
                      {numbeOfDay} ngày {numberOfNight} đêm
                    </div>
                  </div>
                  <div className={cx("color_616161")}>
                    Phương tiện : {handleIconVehicle(vehicle)}
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("col-lg border")}>
              <div className={cx("d-flex justify-content-between")}>
                <div>Khởi hành:</div>
                <div>{moment(Calendars[0]?.startDay).format("DD-MM-YYYY")}</div>
              </div>

              <h4 className={cx("price")}>
                {funtions?.formatNumberWithCommas(priceAdult || 0)}
                <span>VND</span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardSearch;
