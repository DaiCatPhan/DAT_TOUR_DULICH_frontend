import {
  IconClockHour10,
  IconBus,
  IconZeppelin,
  IconShip,
} from "@tabler/icons-react";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";

function formatNumberWithCommas(number) {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function formatDateMoment(date) {
  return moment(date).format("DD-MM-YYYY");
}

export default {
  formatNumberWithCommas,
  formatDateMoment,
};
