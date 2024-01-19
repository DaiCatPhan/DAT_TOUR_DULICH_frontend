import axios from "../utils/customize-axios";

const createCalendar = (data) => {
  return axios.post("/api/v1/calendar/create", data);
};

export default { createCalendar }; 
