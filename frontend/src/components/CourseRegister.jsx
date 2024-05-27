import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClassAPI from "../api/ClassAPI";
import CourseAPI from "../api/CourseAPI";
import EnrollmentAPI from "../api/EnrollmentAPI";
import ScheduleAPI from "../api/ScheduleAPI";
import SemesterAPI from "../api/SemesterAPI";
import {
  renderClassData,
  renderEnrollmentData,
  renderScheduleData,
} from "../utils/handler";

const CourseRegister = () => {
  const { user } = useSelector((state) => state.user);
  const [semester, setSemester] = useState("");
  const [semesterList, setSemesterList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [classList, setClassList] = useState([]);
  const [clazz, setClazz] = useState(null);
  const [scheduleList, setScheduleList] = useState([]);
  const [enrollmentList, setEnrollmentList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await SemesterAPI.getAllSemesters();
      if (data) {
        setSemesterList(data);
        setSemester(data[0].id);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await CourseAPI.getAllCourses();
      if (data) {
        setCourseList(data);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await EnrollmentAPI.getAllEnrollments(user.id);
      if (data) {
        let newData = data.filter((item) => item.semesterId === semester);
        newData.forEach((item) => {
          delete item.semesterId;
        });

        newData = newData.map((item) => renderEnrollmentData(item));

        setEnrollmentList(newData);
      }
    };

    fetchData();
  }, [semester]);

  const handleCourseClick = async (row) => {
    const data = await ClassAPI.getAllClasses(semester, null, row.id);
    if (data) {
      const newData = data.map((item) => {
        return renderClassData(item);
      });

      setClassList(newData);
    } else {
      setClassList([]);
    }
  };

  const handleClassClick = async (row) => {
    setClazz(row.id);
    const data = await ScheduleAPI.getAllSchedules(row.id);
    if (data) {
      const newData = data.map((item) => {
        return renderScheduleData(item);
      });

      setScheduleList(newData);
    } else {
      setScheduleList([]);
    }
  };

  const handleEnroll = async () => {
    if (!clazz) {
      toast.error("Vui lòng chọn lớp học phần");
      return;
    }

    const enrollment = {
      studentId: user.id,
      clazzId: clazz,
    };

    const data = await EnrollmentAPI.enroll(enrollment);
    if (data.status === "success") {
      const newData = [...enrollmentList, renderEnrollmentData(data.data)];
      setEnrollmentList(newData);
      toast.success("Đăng ký học phần thành công");
    } else {
      if (data.message === "Student or clazz are not found") {
        toast.error("Sinh viên hoặc lớp học phần không tồn tại");
      } else if (data.message === "You have already enrolled in this course") {
        toast.error("Bạn đã đăng ký học phần này rồi");
      } else if (
        data.message ===
        "You have to enroll in theory clazz before enroll in this practice clazz"
      ) {
        toast.error(
          "Bạn phải đăng ký lớp lý thuyết trước khi đăng ký lớp thực hành"
        );
      } else if (
        data.message ===
        "You have to enroll in prerequisite course before enroll in this course"
      ) {
        toast.error(
          "Bạn phải đăng ký môn tiên quyết trước khi đăng ký môn này"
        );
      } else if (data.message === "This clazz is full") {
        toast.error("Lớp học phần đã đầy");
      } else {
        toast.error("Đăng ký học phần thất bại");
      }
    }
  };

  const handleUnenroll = async (id) => {
    const data = await EnrollmentAPI.unenroll(user.id, id);
    if (data) {
      const newData = enrollmentList.filter((item) => item.id !== id);
      setEnrollmentList(newData);
      toast.success("Huỷ đăng ký học phần thành công");
    } else {
      toast.error("Huỷ đăng ký học phần thất bại");
    }
  };

  const courseColumn = [
    { field: "id", headerName: "Mã môn học", width: 120 },
    { field: "name", headerName: "Tên môn học", width: 400 },
    { field: "description", headerName: "Mô tả", width: 680 },
    { field: "credit", headerName: "Số tín chỉ", width: 100 },
    { field: "prerequisite", headerName: "Môn tiên quyết", width: 120 },
  ];

  const classColumn = [
    { field: "id", headerName: "Mã lớp", width: 120 },
    { field: "name", headerName: "Tên lớp", width: 180 },
    { field: "course", headerName: "Mã môn học", width: 120 },
    { field: "lecturer", headerName: "Mã giảng viên", width: 120 },
    { field: "capacity", headerName: "Sĩ số tối đa", width: 120 },
    { field: "current", headerName: "Sĩ số hiện tại", width: 120 },
    { field: "type", headerName: "Loại lớp", width: 120 },
    { field: "theory", headerName: "Lớp lý thuyết", width: 120 },
    { field: "startDate", headerName: "Ngày bắt đầu", width: 120 },
    { field: "endDate", headerName: "Ngày kết thúc", width: 120 },
    { field: "status", headerName: "Trạng thái", width: 150 },
  ];

  const scheduleColumn = [
    { field: "id", headerName: "STT", width: 100 },
    { field: "name", headerName: "Tên tiết học", width: 300 },
    { field: "clazz", headerName: "Mã lớp", width: 200 },
    { field: "room", headerName: "Phòng học", width: 300 },
    { field: "time", headerName: "Thời gian", width: 500 },
  ];

  const enrollmentColumn = [
    { field: "id", headerName: "Mã lớp học phần", width: 150 },
    { field: "name", headerName: "Tên lớp học", width: 250 },
    { field: "courseId", headerName: "Mã môn học", width: 150 },
    { field: "type", headerName: "Loại lớp", width: 150 },
    { field: "theory", headerName: "Lớp lý thuyết", width: 150 },
    { field: "credit", headerName: "Số tín chỉ", width: 150 },
    { field: "createdAt", headerName: "Ngày đăng ký", width: 150 },
    { field: "status", headerName: "Trạng thái", width: 150 },
    {
      field: "delete",
      headerName: "Huỷ đăng ký",
      width: 120,
      renderCell: (value) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleUnenroll(value.row.id)}
          disabled={value.row.status === "Đã đóng"}
        >
          <DeleteIcon />
        </Button>
      ),
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: "10px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "30px" }}>
        <Typography fontWeight="bold" fontSize="16px" marginRight="10px">
          Chọn học kỳ
        </Typography>
        <Select
          value={semester}
          size="small"
          onChange={(e) => setSemester(e.target.value)}
        >
          {semesterList.map((semester) => (
            <MenuItem key={semester.id} value={semester.id}>
              {semester.name}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Typography fontWeight="bold" fontSize="20px">
        Danh sách môn học
      </Typography>
      <Box sx={{ marginTop: "20px", height: 400, width: "100%" }}>
        <DataGrid
          rows={courseList}
          columns={courseColumn}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          disableColumnResize
          disableAutosize
          disableColumnMenu
          disableColumnSorting
          onRowClick={handleCourseClick}
        />
      </Box>
      <Typography fontWeight="bold" fontSize="20px" marginTop="30px">
        Danh sách lớp học phần
      </Typography>
      <Box sx={{ marginTop: "20px", height: 400, width: "100%" }}>
        <DataGrid
          rows={classList}
          columns={classColumn}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          disableColumnResize
          disableAutosize
          disableColumnMenu
          disableColumnSorting
          onRowClick={handleClassClick}
        />
      </Box>
      <Typography fontWeight="bold" fontSize="20px" marginTop="30px">
        Danh sách lịch học
      </Typography>
      <Box sx={{ marginTop: "20px", height: 400, width: "100%" }}>
        <DataGrid
          rows={scheduleList}
          columns={scheduleColumn}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          disableColumnResize
          disableAutosize
          disableColumnMenu
          disableColumnSorting
          disableRowSelectionOnClick
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: "20px" }}
        startIcon={<PersonIcon />}
        onClick={handleEnroll}
      >
        Đăng ký học phần
      </Button>
      <Typography fontWeight="bold" fontSize="20px" marginTop="30px">
        Danh sách lớp học phần đã đăng ký
      </Typography>
      <Box sx={{ marginTop: "20px", height: 400, width: "100%" }}>
        <DataGrid
          rows={enrollmentList}
          columns={enrollmentColumn}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          disableColumnResize
          disableAutosize
          disableColumnMenu
          disableColumnSorting
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default CourseRegister;
