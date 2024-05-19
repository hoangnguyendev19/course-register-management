import axios from "axios";

const API_URL = "http://localhost:8081/api/v1";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getAllDepartments = async () => {
  try {
    const { data } = await axiosInstance.get("/departments");

    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const DepartmentAPI = {
  getAllDepartments,
};

export default DepartmentAPI;
