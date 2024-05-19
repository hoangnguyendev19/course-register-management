import axios from "axios";

const API_URL = "http://localhost:8081/api/v1";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getAllCourses = async () => {
  try {
    const { data } = await axiosInstance.get("/courses");

    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const addCourse = async (course) => {
  try {
    const { data } = await axiosInstance.post("/courses", course);

    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const updateCourse = async (id, course) => {
  try {
    const { data } = await axiosInstance.put(`/courses/${id}`, course);

    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const deleteCourse = async (id) => {
  try {
    const { data } = await axiosInstance.delete(`/courses/${id}`);

    return data;
  } catch (error) {
    console.error(error);
  }
};

const CourseAPI = {
  getAllCourses,
  addCourse,
  updateCourse,
  deleteCourse,
};

export default CourseAPI;
