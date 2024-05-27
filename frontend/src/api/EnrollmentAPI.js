import axios from "axios";

const API_URL = "http://localhost:8081/api/v1";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getAllEnrollments = async (student) => {
  try {
    const { data } = await axiosInstance.get(
      `/enrollments?studentId=${student}`
    );

    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const enroll = async (enrollment) => {
  try {
    const { data } = await axiosInstance.post("/enrollments", enrollment);

    return data;
  } catch (error) {
    console.error(error);
    if (error.response.status === 400) {
      return error.response.data;
    }
  }
};

const unenroll = async (studentId, clazzId) => {
  try {
    const { data } = await axiosInstance.delete(
      `/enrollments?studentId=${studentId}&clazzId=${clazzId}`
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

const EnrollmentAPI = {
  getAllEnrollments,
  enroll,
  unenroll,
};

export default EnrollmentAPI;
