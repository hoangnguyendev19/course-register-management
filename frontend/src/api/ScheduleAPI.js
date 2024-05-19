import axios from "axios";

const API_URL = "http://localhost:8081/api/v1";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getAllSchedules = async (clazz) => {
  try {
    if (clazz != null) {
      const { data } = await axiosInstance.get(`/schedules?clazz=${clazz}`);
      return data.data;
    } else {
      const { data } = await axiosInstance.get("/schedules");
      return data.data;
    }
  } catch (error) {
    console.error(error);
  }
};

const getAllSchedulesByStudentId = async (studentId) => {
  try {
    const { data } = await axiosInstance.get(
      `/schedules?studentId=${studentId}`
    );

    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const getAllSchedulesByLecturerId = async (lecturerId) => {
  try {
    const { data } = await axiosInstance.get(
      `/schedules?lecturerId=${lecturerId}`
    );

    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const addSchedule = async (schedule) => {
  try {
    const { data } = await axiosInstance.post("/schedules", schedule);

    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const updateSchedule = async (id, schedule) => {
  try {
    const { data } = await axiosInstance.put(`/schedules/${id}`, schedule);

    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const deleteSchedule = async (id) => {
  try {
    const { data } = await axiosInstance.delete(`/schedules/${id}`);

    return data;
  } catch (error) {
    console.error(error);
  }
};

const ScheduleAPI = {
  getAllSchedules,
  getAllSchedulesByStudentId,
  getAllSchedulesByLecturerId,
  addSchedule,
  updateSchedule,
  deleteSchedule,
};

export default ScheduleAPI;
