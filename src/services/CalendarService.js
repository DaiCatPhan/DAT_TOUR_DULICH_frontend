import axios from "../utils/customize-axios";

const createCalendar = (data) => {
  return axios.post("/api/v1/calendar/create", data);
};

const createCalendarWithMonth = (data) => {
  return axios.post("/api/v1/calendar/createWithMonth", data);
};

const update = (data) => {
  return axios.put("/api/v1/calendar/update", data);
};

const deleteCalendar = (data) => {
  return axios.delete("/api/v1/calendar/delete", {
    data: data,
  });
};

export default { update ,createCalendar, deleteCalendar, createCalendarWithMonth };
