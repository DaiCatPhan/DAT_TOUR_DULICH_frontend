import className from "classnames/bind";
import styles from "./TicketUI.module.scss";
const cx = className.bind(styles);

import { IconDiscountCheckFilled } from "@tabler/icons-react";

function TicketUI(props) {
  const { title, rotate } = props;
  return (
    <div
      className={cx("border p-2 rounded d-flex align-items-center", {
        [rotate]: rotate,
      })}
    >
      <div className={cx("mx-2")}>
        <IconDiscountCheckFilled
          style={{
            color: "orange",
            width: "30px",
            height: "30px",
          }}
        />
      </div>
      <div className={cx("fs-4")}>{title}</div>
    </div>
  );
}

export default TicketUI;
