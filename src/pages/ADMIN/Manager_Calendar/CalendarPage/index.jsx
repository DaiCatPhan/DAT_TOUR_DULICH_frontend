import className from "classnames/bind";
import styles from "./CalendarPage.module.scss";
const cx = className.bind(styles);

function CalendarPage() {
  return <div className={cx("wrapper")}>CalendarPage</div>;
}

export default CalendarPage;
