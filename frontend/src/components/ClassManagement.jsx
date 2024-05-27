import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ClassAPI from "../api/ClassAPI";
import CourseAPI from "../api/CourseAPI";
import LecturerAPI from "../api/LecturerAPI";
import SemesterAPI from "../api/SemesterAPI";
import { renderClassData } from "../utils/handler";
import AddClassModal from "./AddClassModal";
import EditClassModal from "./EditClassModal";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";

const ClassManagement = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [semesterList, setSemesterList] = useState([]);
  const [semester, setSemester] = useState("");
  const [classList, setClassList] = useState([]);
  const [classTheory, setClassTheory] = useState([]);
  const [editClass, setEditClass] = useState(null);
  const [courseList, setCourseList] = useState([]);
  const [lecturerList, setLecturerList] = useState([]);

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
        const data = await ClassAPI.getAllClasses(semester, null, null);
        if (data) {
          const newData = data.map((c) => renderClassData(c));

          setClassList(newData);
        }
      };

      fetchData();
    }
  }, [semester]);

  useEffect(() => {
    if (semester) {
      const fetchData = async () => {
        const data = await ClassAPI.getAllClasses(semester, "theory", null);
        if (data) {
          setClassTheory(data);
        }
      };

      fetchData();
    }
  }, [semester]);

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
      const data = await LecturerAPI.getAllLecturers();
      if (data) {
        setLecturerList(data);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const data = await ClassAPI.deleteClass(id);
    if (data) {
      const newClassList = classList.filter((c) => c.id !== id);
      setClassList(newClassList);
      toast.success("Xóa lớp học phần thành công");
    } else {
      toast.error("Xóa lớp học phần thất bại");
    }
  };

  const handleLock = async (id) => {
    const data = await ClassAPI.closeClass(id);
    console.log(data);
    if (data) {
      const newClassList = classList.map((c) =>
        c.id === id ? renderClassData(data) : c
      );
      setClassList(newClassList);
      toast.success("Đóng lớp học phần thành công");
    } else {
      toast.error("Đóng lớp học phần thất bại");
    }
  };

  const handleUnlock = async (id) => {
    const data = await ClassAPI.openClass(id);
    if (data) {
      const newClassList = classList.map((c) =>
        c.id === id ? renderClassData(data) : c
      );

      setClassList(newClassList);
      toast.success("Mở lớp học phần thành công");
    } else {
      toast.error("Mở lớp học phần thất bại");
    }
  };

  const handleAdd = async (newClass) => {
    const data = await ClassAPI.addClass({ ...newClass, semester });
    if (data) {
      const newData = renderClassData(data);
      setClassList([...classList, newData]);
      toast.success("Thêm lớp học phần thành công");
    } else {
      toast.error("Thêm lớp học phần thất bại");
    }
  };

  const handleEdit = async (id, clazz) => {
    const data = await ClassAPI.updateClass(id, clazz);
    if (data) {
      const newClassList = classList.map((c) =>
        c.id === id ? renderClassData(data) : c
      );
      setClassList(newClassList);
      toast.success("Cập nhật lớp học phần thành công");
    } else {
      toast.error("Cập nhật lớp học phần thất bại");
    }
  };

  const handleOpenEdit = (value) => {
    setEditClass({ ...value.row });
    setOpenEdit(true);
  };

  const column = [
    { field: "id", headerName: "Mã lớp", width: 90 },
    { field: "name", headerName: "Tên lớp", width: 120 },
    { field: "course", headerName: "Mã môn học", width: 100 },
    { field: "lecturer", headerName: "Mã giảng viên", width: 120 },
    { field: "capacity", headerName: "Sĩ số tối đa", width: 100 },
    { field: "current", headerName: "Sĩ số hiện tại", width: 120 },
    { field: "type", headerName: "Loại lớp", width: 100 },
    { field: "theory", headerName: "Lớp lý thuyết", width: 110 },
    { field: "startDate", headerName: "Ngày bắt đầu", width: 120 },
    { field: "endDate", headerName: "Ngày kết thúc", width: 120 },
    { field: "status", headerName: "Trạng thái", width: 100 },
    {
      field: "lock",
      headerName: "Khoá lớp",
      width: 80,
      renderCell: (value) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            value.row.status === "Đang mở"
              ? handleLock(value.row.id)
              : handleUnlock(value.row.id);
          }}
        >
          {value.row.status === "Đang mở" ? <LockIcon /> : <LockOpenIcon />}
        </Button>
      ),
    },
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
        Danh sách lớp học phần
      </Typography>
      <Box>
        <DataGrid
          rows={classList}
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
      <AddClassModal
        open={openAdd}
        setOpen={setOpenAdd}
        handleAdd={handleAdd}
        classTheory={classTheory}
        courseList={courseList}
        lecturerList={lecturerList}
      />
      <EditClassModal
        open={openEdit}
        setOpen={setOpenEdit}
        handleEdit={handleEdit}
        classTheory={classTheory}
        clazz={editClass}
        courseList={courseList}
        lecturerList={lecturerList}
      />
    </Box>
  );
};

export default ClassManagement;
