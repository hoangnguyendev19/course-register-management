import axios from "axios";

const API_URL = "http://localhost:8081/api/v1";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getAllClasses = async (semester, type, course) => {
  try {
    if (type == null && course != null) {
      const { data } = await axiosInstance.get(
        `/classes?semester=${semester}&course=${course}`
      );

      return data.data;
    } else if (type != null && course == null) {
      const { data } = await axiosInstance.get(
        `/classes?semester=${semester}&type=${type}`
      );

      return data.data;
    } else {
      const { data } = await axiosInstance.get(`/classes?semester=${semester}`);

      return data.data;
    }

    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const addClass = async (course) => {
  try {
    const { data } = await axiosInstance.post("/classes", course);

    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const updateClass = async (id, course) => {
  try {
    const { data } = await axiosInstance.put(`/classes/${id}`, course);

    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const deleteClass = async (id) => {
  try {
    const { data } = await axiosInstance.delete(`/classes/${id}`);

    return data;
  } catch (error) {
    console.error(error);
  }
};

const closeClass = async (id) => {
  try {
    const { data } = await axiosInstance.put(`/classes/${id}/close`);

    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const openClass = async (id) => {
  try {
    const { data } = await axiosInstance.put(`/classes/${id}/open`);

    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const ClassAPI = {
  getAllClasses,
  addClass,
  updateClass,
  deleteClass,
  closeClass,
  openClass,
};

export default ClassAPI;
