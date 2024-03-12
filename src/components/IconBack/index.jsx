import { IconChevronsLeft } from "@tabler/icons-react";
import className from "classnames/bind";
import styles from "./IconBack.module.scss";
const cx = className.bind(styles);
import { Link } from "react-router-dom";
function IconBack() {
  return (
    <div className={cx("iconBack")}>
      <Link to={"/"}>
        <IconChevronsLeft />
      </Link>
    </div>
  );
}

export default IconBack; 
