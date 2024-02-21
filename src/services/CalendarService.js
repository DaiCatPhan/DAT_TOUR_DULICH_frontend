import axios from "../utils/customize-axios";

const createCalendar = (data) => {
  return axios.post("/api/v1/calendar/create", data);
};

const deleteCalendar = (data) => {
  return axios.delete("/api/v1/calendar/delete", { 
    data: data,
  });
};

export default { createCalendar, deleteCalendar };
