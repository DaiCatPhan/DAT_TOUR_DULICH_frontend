const typeTour = [
  {
    id: 1,
    type: "Tour Du Lịch Miền Bắc",
  },
  {
    id: 2,
    type: "Tour Du Lịch Miền Trung",
  },
  {
    id: 3,
    type: "Tour Du Lịch Miền Nam",
  },
  {
    id: 4,
    type: "Tour Du Lịch Hành Hương",
  },
  {
    id: 5,
    type: "Tour Nội Địa Cao Cấp",
  },
  {
    id: 6,
    type: "Tour Trải Nghiệm Địa Phương",
  },
  {
    id: 7,
    type: "Tour Du Lịch Tây Nguyên",
  },
  {
    id: 8,
    type: "Tour Vi Vu Cuối Tuần",
  },
  {
    id: 9,
    type: "Tour Thám Hiểm",
  },
];

const statusActivity = [
  {
    id: 1,
    label: "Hoạt động",
    value: "1",
  },
  {
    id: 2,
    label: "Không hoạt động",
    value: "0",
  },
];

const role = [
  {
    id: 1,
    label: "khách hàng",
    value: "khách hàng",
  },
  {
    id: 2,
    label: "admin",
    value: "admin",
  },
];

// import {
//   IconClockHour10,
//   IconBus,
//   IconZeppelin,
//   IconShip,
// } from "@tabler/icons-react";

// const handleIconVehicle = (vehicle) => {
//   if (vehicle == "xe") {
//     return <IconBus />;
//   } else if (vehicle == "bay") {
//     return <IconZeppelin />;
//   } else {
//     return <IconShip />;
//   }
// };

export default { typeTour, statusActivity, role };
