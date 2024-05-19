import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import ScheduleAPI from "../api/ScheduleAPI";
import { renderScheduleData } from "../utils/handler";

const StudentCalendar = () => {
  const { user } = useSelector((state) => state.user);
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);

  useEffect(() => {
    handleChange(dayjs());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await ScheduleAPI.getAllSchedulesByStudentId(user.id);
      if (data) {
        setSchedules(data);
      }
    };

    fetchData();
  }, [user]);

  const handleChange = async (date) => {
    const day = date.$D;
    const month = date.$M + 1;
    const year = date.$y;
    const dayOfWeek = dayjs(`${year}-${month}-${day}`);

    const startDate = dayOfWeek
      .subtract(dayOfWeek.day() === 0 ? 6 : dayOfWeek.day() - 1, "day")
      .format("YYYY-MM-DD");
    const endDate = dayOfWeek
      .add(dayOfWeek.day() === 0 ? 0 : 7 - dayOfWeek.day(), "day")
      .format("YYYY-MM-DD");

    const filteredSchedules = schedules.filter((schedule) => {
      return dayjs(schedule.time).isBetween(startDate, endDate, "day", "[]");
    });

    const newSchedules = filteredSchedules.map((s) => renderScheduleData(s));
    setFilteredSchedules(newSchedules);
  };

  const column = [
    { field: "id", headerName: "STT", width: 100 },
    { field: "name", headerName: "Tên tiết học", width: 300 },
    { field: "clazz", headerName: "Mã lớp", width: 200 },
    { field: "room", headerName: "Phòng học", width: 300 },
    { field: "time", headerName: "Thời gian", width: 500 },
  ];

  return (
    <Box>
      <Box sx={{ marginBottom: "30px" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Chọn lịch học"
              defaultValue={dayjs()}
              format="DD/MM/YYYY"
              onChange={handleChange}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Box>
      <Box>
        <DataGrid
          rows={filteredSchedules}
          columns={column}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 3 },
            },
          }}
          pageSizeOptions={[3]}
          disableColumnResize
          disableAutosize
          disableColumnMenu
          disableColumnSorting
          disableRowSelectionOnClick
          disableColumnSelector
        />
      </Box>
    </Box>
  );
};

export default StudentCalendar;
