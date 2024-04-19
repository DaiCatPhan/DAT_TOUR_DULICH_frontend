import className from "classnames/bind";
import styles from "./FilterCondition.module.scss";
import { useState } from "react";
const cx = className.bind(styles);

import ButtonFilter from "../ButtonFilter/ButtonFilter";

function FilterCondition() {
  const [active, setActive] = useState("");
  // QUERY
  const filterCondition = [
    {
      label: "Sắp xếp theo:",
      key: "1",
    },
    {
      label: "Đề xuất",
      key: "2",
    },
    {
      label: "Thời lượng tour",
      key: "3",
    },
    {
      label: "Ngày khởi hành",
      key: "4",
    },
    {
      label: "Giá tour",
      key: "5",
    },
  ];

  const handleToggleKey = (item, sortKey) => {
    console.log("item", item);
    console.log("sortKey", sortKey);
    const { key } = item;
    setActive(key);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("d-flex border border-danger justify-content-around")}>
        {filterCondition?.map((item) => {
          return (
            // <div
            //   onClick={() => handleToggleKey(item)}
            //   key={item?.key}
            //   className={cx(
            //     "border py-2 px-3 flex-grow-1 text-center",
            //     "poiter",
            //     "itemFilterCondition",
            //     {
            //       active: item.key == active,
            //     }
            //   )}
            // >
            //   {item?.label}
            // </div>
            <ButtonFilter
              key={item?.key}
              active={item.key == active}
              item={item}
              handleToggleKey={handleToggleKey}
            />
          );
        })}
      </div>
    </div>
  );
}

export default FilterCondition;
