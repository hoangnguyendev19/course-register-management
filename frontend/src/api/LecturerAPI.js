import axios from "axios";

const API_URL = "http://localhost:8081/api/v1";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const login = async (username, password) => {
  try {
    const { data } = await axiosInstance.post("/lecturers/login", {
      username,
      password,
    });

    if (data.data) {
      localStorage.setItem("user", JSON.stringify(data.data));
    }

    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const logout = () => {
  localStorage.removeItem("user");
};

const getAllLecturers = async () => {
  try {
    const { data } = await axiosInstance.get("/lecturers");

    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const addLecturer = async (lecturer) => {
  try {
    const { data } = await axiosInstance.post("/lecturers", lecturer);

    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const updateLecturer = async (id, lecturer) => {
  try {
    const { data } = await axiosInstance.put(`/lecturers/${id}`, lecturer);

    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const deleteLecturer = async (id) => {
  try {
    const { data } = await axiosInstance.delete(`/lecturers/${id}`);

    return data;
  } catch (error) {
    console.error(error);
  }
};

const LecturerAPI = {
  login,
  logout,
  getAllLecturers,
  addLecturer,
  updateLecturer,
  deleteLecturer,
};

export default LecturerAPI;
