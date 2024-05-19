import dayjs from "dayjs";

export const renderScheduleData = (data) => {
  return {
    ...data,
    name:
      data.name === "morning"
        ? "Buổi sáng"
        : data.name === "afternoon"
        ? "Buổi chiều"
        : "Buổi tối",
    time: dayjs(data.time).format("DD/MM/YYYY"),
  };
};

export const renderClassData = (data) => {
  return {
    ...data,
    type: data.type === "theory" ? "Lý thuyết" : "Thực hành",
    status: data.status === "open" ? "Đang mở" : "Đã đóng",
    startDate: dayjs(data.startDate).format("DD/MM/YYYY"),
    endDate: dayjs(data.endDate).format("DD/MM/YYYY"),
  };
};

export const renderEnrollmentData = (data) => {
  return {
    ...data,
    type: data.type === "theory" ? "Lý thuyết" : "Thực hành",
    createdAt: dayjs(data.createdAt).format("DD/MM/YYYY"),
    status: data.status === "open" ? "Đang mở" : "Đã đóng",
  };
};

export const renderUserData = (data) => {
  return {
    ...data,
    gender: data.gender === "male" ? "Nam" : "Nữ",
    dateOfBirth: dayjs(data.dateOfBirth).format("DD/MM/YYYY"),
  };
};
