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
    const { data } = await axiosInstance.post("/students/login", {
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

const getAllStudents = async () => {
  try {
    const { data } = await axiosInstance.get("/students");

    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const addStudent = async (student) => {
  try {
    const { data } = await axiosInstance.post("/students", student);

    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const updateStudent = async (id, student) => {
  try {
    const { data } = await axiosInstance.put(`/students/${id}`, student);

    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const deleteStudent = async (id) => {
  try {
    const { data } = await axiosInstance.delete(`/students/${id}`);

    return data;
  } catch (error) {
    console.error(error);
  }
};

const StudentAPI = {
  login,
  logout,
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
};

export default StudentAPI;
