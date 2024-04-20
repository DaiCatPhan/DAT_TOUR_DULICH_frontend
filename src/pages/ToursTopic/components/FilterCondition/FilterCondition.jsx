import className from "classnames/bind";
import styles from "./FilterCondition.module.scss";
import { useState } from "react";
const cx = className.bind(styles);

import ButtonFilter from "../ButtonFilter/ButtonFilter";

function FilterCondition(props) {
  const { onClickFilter } = props;
  const [active, setActive] = useState("1");
  // QUERY
  const filterCondition = [
    {
      key: "1",
      label: "Đề xuất",
      value: "",
    },
    {
      key: "2",
      label: "Thời lượng tour",
      value: "",
    },
    {
      key: "3",
      label: "Ngày khởi hành",
      value: "startDay",
    },
    {
      key: "4",
      label: "Giá tour",
      value: "priceAdult",
    },
  ];

  const handleToggleKey = (item, sortKey) => {
    const { key } = item;
    setActive(key);
    onClickFilter({ item, sortKey });
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("d-flex")}>
        <div
          className={cx(
            "border py-2 px-3 flex-grow-1 text-center d-flex justify-content-center",
            "poiter",
            "itemFilterCondition",
            {
              active,
            }
          )}
        >
          Sắp xếp theo
        </div>
        {filterCondition?.map((item) => {
          return (
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
