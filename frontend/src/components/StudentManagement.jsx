import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import StudentAPI from "../api/StudentAPI";
import { renderUserData } from "../utils/handler";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";

const StudentManagement = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await StudentAPI.getAllStudents();
        if (data) {
          const userList = data.map((user) => renderUserData(user));

          setUsers(userList);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const data = await StudentAPI.deleteStudent(id);
    if (data) {
      const newUsers = users.filter((user) => user.id !== id);
      setUsers(newUsers);
      toast.success("Xóa người dùng thành công");
    } else {
      toast.error("Xóa người dùng thất bại");
    }
  };

  const handleAdd = async (user) => {
    const data = await StudentAPI.addStudent(user);
    if (data) {
      const newData = renderUserData(data);
      setUsers([...users, newData]);
      toast.success("Thêm người dùng thành công");
    } else {
      toast.error("Thêm người dùng thất bại");
    }
  };

  const handleEdit = async (id, newUser) => {
    const data = await StudentAPI.updateStudent(id, newUser);
    if (data) {
      const newList = users.map((user) => {
        if (user.id === id) {
          return renderUserData(data);
        }
        return user;
      });
      setUsers(newList);
      toast.success("Cập nhật người dùng thành công");
    } else {
      toast.error("Cập nhật người dùng thất bại");
    }
  };

  const handleOpenEdit = (value) => {
    setEditUser({ ...value.row });
    setOpenEdit(true);
  };

  const studentColumn = [
    { field: "id", headerName: "Mã sinh viên", width: 120 },
    { field: "fullName", headerName: "Tên sinh viên", width: 300 },
    { field: "gender", headerName: "Giới tính", width: 100 },
    { field: "dateOfBirth", headerName: "Ngày sinh", width: 120 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "phone", headerName: "Số điện thoại", width: 120 },
    { field: "department", headerName: "Khoa", width: 220 },
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
        Danh sách sinh viên
      </Typography>

      <Box>
        <DataGrid
          rows={users}
          columns={studentColumn}
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
      <AddUserModal open={openAdd} setOpen={setOpenAdd} handleAdd={handleAdd} />
      <EditUserModal
        open={openEdit}
        setOpen={setOpenEdit}
        user={editUser}
        handleEdit={handleEdit}
      />
    </Box>
  );
};

export default StudentManagement;
