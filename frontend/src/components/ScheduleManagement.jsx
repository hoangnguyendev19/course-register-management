import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ClassAPI from "../api/ClassAPI";
import ScheduleAPI from "../api/ScheduleAPI";
import SemesterAPI from "../api/SemesterAPI";
import AddScheduleModal from "./AddScheduleModal";
import dayjs from "dayjs";
import EditScheduleModal from "./EditScheduleModal";
import { renderScheduleData } from "../utils/handler";

const ScheduleManagement = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [scheduleList, setScheduleList] = useState([]);
  const [editSchedule, setEditSchedule] = useState(null);
  const [classList, setClassList] = useState([]);
  const [semesterList, setSemesterList] = useState([]);
  const [semester, setSemester] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await ScheduleAPI.getAllSchedules(null);
      if (data) {
        const newData = data.map((s) => renderScheduleData(s));
        setScheduleList(newData);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await SemesterAPI.getAllSemesters();
      setSemesterList(data);
      setSemester(data[0].id);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (semester) {
      const fetchData = async () => {
        const data = await ClassAPI.getAllClasses(semester, null);
        if (data) {
          setClassList(data);
        }
      };

      fetchData();
    }
  }, [semester]);

  const handleDelete = async (id) => {
    const data = await ScheduleAPI.deleteSchedule(id);
    if (data) {
      const newData = scheduleList.filter((s) => s.id !== id);
      setScheduleList(newData);
      toast.success("Xóa lịch học thành công!");
    } else {
      toast.error("Xóa lịch học thất bại!");
    }
  };

  const handleAdd = async (schedule) => {
    const data = await ScheduleAPI.addSchedule(schedule);
    if (data) {
      const newData = renderScheduleData(data);
      const newList = [...scheduleList, newData];
      setScheduleList(newList);
      toast.success("Thêm lịch học thành công!");
    } else {
      toast.error("Thêm lịch học thất bại!");
    }
  };

  const handleEdit = async (id, schedule) => {
    const data = await ScheduleAPI.updateSchedule(id, schedule);
    if (data) {
      const newData = scheduleList.map((s) =>
        s.id === id ? renderScheduleData(data) : s
      );
      setScheduleList(newData);
      toast.success("Cập nhật lịch học thành công!");
    } else {
      toast.error("Cập nhật lịch học thất bại!");
    }
  };

  const handleOpenEdit = (value) => {
    setEditSchedule({ ...value.row });
    setOpenEdit(true);
  };

  const column = [
    { field: "id", headerName: "STT", width: 50 },
    { field: "name", headerName: "Tên tiết học", width: 200 },
    { field: "clazz", headerName: "Mã lớp", width: 200 },
    { field: "room", headerName: "Phòng học", width: 200 },
    { field: "time", headerName: "Thời gian", width: 350 },
    {
      field: "edit",
      headerName: "Cập nhật",
      width: 80,
      renderCell: (value) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenEdit(value)}
        >
          <EditIcon />
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Xóa",
      width: 80,
      renderCell: (value) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(value.row.id)}
        >
          <DeleteIcon />
        </Button>
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <Typography variant="h6" fontWeight="bold" marginRight="10px">
          Chọn học kỳ
        </Typography>
        <Select value={semester} onChange={(e) => setSemester(e.target.value)}>
          {semesterList.map((semester) => (
            <MenuItem key={semester.id} value={semester.id}>
              {semester.name}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box sx={{ my: 2 }}>
        <Button
          variant="contained"
          color="success"
          onClick={() => setOpenAdd(true)}
          startIcon={<AddIcon />}
        >
          Thêm
        </Button>
      </Box>
      <Typography variant="h5" fontWeight="bold" marginBottom="20px">
        Danh sách lịch học
      </Typography>
      <Box>
        <DataGrid
          rows={scheduleList}
          columns={column}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5]}
          disableColumnResize
          disableAutosize
          disableColumnMenu
          disableRowSelectionOnClick
          disableColumnSorting
        />
      </Box>
      <AddScheduleModal
        open={openAdd}
        setOpen={setOpenAdd}
        handleAdd={handleAdd}
        classList={classList}
      />
      <EditScheduleModal
        open={openEdit}
        setOpen={setOpenEdit}
        handleEdit={handleEdit}
        schedule={editSchedule}
        classList={classList}
      />
    </Box>
  );
};

export default ScheduleManagement;
