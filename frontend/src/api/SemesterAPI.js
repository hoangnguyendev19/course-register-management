import axios from "axios";

const API_URL = "http://localhost:8081/api/v1";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getAllSemesters = async () => {
  try {
    const { data } = await axiosInstance.get("/semesters");

    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const SemesterAPI = {
  getAllSemesters,
};

export default SemesterAPI;
