import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CourseAPI from "../api/CourseAPI";
import AddCourseModal from "./AddCourseModal";
import EditCourseModal from "./EditCourseModal";

const CourseManagement = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [courses, setCourses] = useState([]);
  const [editCourse, setEditCourse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await CourseAPI.getAllCourses();
      if (data) {
        setCourses(data);
      }
    };

    fetchData();
  }, []);

  const handleAdd = async (course) => {
    const data = await CourseAPI.addCourse(course);
    if (data) {
      setCourses([...courses, data]);
      toast.success("Thêm môn học thành công");
    } else {
      toast.error("Thêm môn học thất bại");
    }
  };

  const handleOpenEdit = (value) => {
    setEditCourse({ ...value.row });
    setOpenEdit(true);
  };

  const handleEdit = async (id, course) => {
    const data = await CourseAPI.updateCourse(id, course);
    if (data) {
      const newCourses = courses.map((c) => (c.id === id ? data : c));
      setCourses(newCourses);
      toast.success("Cập nhật môn học thành công");
    } else {
      toast.error("Cập nhật môn học thất bại");
    }
  };

  const handleDelete = async (id) => {
    const data = await CourseAPI.deleteCourse(id);
    if (data) {
      const newCourses = courses.filter((course) => course.id !== id);
      setCourses(newCourses);
      toast.success("Xóa môn học thành công");
    } else {
      toast.error("Xóa môn học thất bại");
    }
  };

  const column = [
    { field: "id", headerName: "Mã môn học", width: 120 },
    { field: "name", headerName: "Tên môn học", width: 300 },
    { field: "description", headerName: "Mô tả", width: 480 },
    { field: "credit", headerName: "Số tín chỉ", width: 100 },
    { field: "prerequisite", headerName: "Môn tiên quyết", width: 300 },
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
        Danh sách môn học
      </Typography>
      <Box>
        <DataGrid
          rows={courses}
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
      <AddCourseModal
        open={openAdd}
        setOpen={setOpenAdd}
        handleAdd={handleAdd}
        courseList={courses}
      />
      <EditCourseModal
        open={openEdit}
        setOpen={setOpenEdit}
        course={editCourse}
        handleEdit={handleEdit}
        courseList={courses}
      />
    </Box>
  );
};

export default CourseManagement;
