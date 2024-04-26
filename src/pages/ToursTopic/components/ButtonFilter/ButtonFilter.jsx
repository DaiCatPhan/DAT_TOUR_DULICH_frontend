import className from "classnames/bind";
import styles from "./ButtonFilter.module.scss";
import { useState } from "react";
const cx = className.bind(styles);

import { IconChevronUp, IconChevronDown } from "@tabler/icons-react";
const sortKeyAr = [
  {
    key: 1,
    label: "bình thường",
    value: "",
  },
  {
    key: 2,
    label: "tăng",
    value: "ASC",
  },
  {
    key: 3,
    label: "giảm",
    value: "DESC",
  },
];

function ButtonFilter(props) {
  const { handleToggleKey, item, active } = props;
  const [sortKey, setSortKey] = useState(1);

  const handleToggleSort = () => {
    let newKey;
    if (!active) {
      newKey = 2;
    } else if (sortKey == 3) {
      newKey = 1;
    } else {
      newKey = sortKey + 1;
    }
    const OjKey = sortKeyAr.find((item) => item.key == newKey);
    handleToggleKey(item, OjKey);
    setSortKey(newKey);
  };
  return (
    <div
      onClick={() => handleToggleSort()}
      className={cx(
        "border py-2 px-3 flex-grow-1 text-center d-flex justify-content-center",
        "poiter",
        "itemFilterCondition", 
        {
          active,
        }
      )}
    >
      <div>{item?.label}</div>
      {active && sortKey == 2 && (
        <div>
          <IconChevronUp />
        </div>
      )}

      {active && sortKey == 3 && (
        <div>
          <IconChevronDown />
        </div>
      )}
    </div>
  );
}

export default ButtonFilter;



