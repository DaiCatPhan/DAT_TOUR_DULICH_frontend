import {
  IconClockHour10,
  IconBus,
  IconZeppelin,
  IconShip,
} from "@tabler/icons-react";

function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") ;
}

// const handleIconVehicle = (vehicle) => {
//   if (vehicle == "xe") {
//     return <IconBus />;
//   } else if (vehicle == "bay") {
//     return <IconZeppelin />;
//   } else {
//     return <IconShip />;
//   }
// };

export default { formatNumberWithCommas };
