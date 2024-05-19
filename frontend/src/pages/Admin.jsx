import LogoutIcon from "@mui/icons-material/Logout";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DepartmentAPI from "../api/DepartmentAPI";
import ClassManagement from "../components/ClassManagement";
import CourseManagement from "../components/CourseManagement";
import LecturerManagement from "../components/LecturerManagement";
import ScheduleManagement from "../components/ScheduleManagement";
import StudentManagement from "../components/StudentManagement";
import { setDepartments } from "../redux/departmentSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice";
import LecturerAPI from "../api/LecturerAPI";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Admin = () => {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    LecturerAPI.logout();
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await DepartmentAPI.getAllDepartments();
      dispatch(setDepartments(data));
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ padding: "0 10px" }}>
      <Button
        variant="contained"
        color="error"
        sx={{ margin: "10px 0" }}
        startIcon={<LogoutIcon />}
        onClick={handleLogout}
      >
        Đăng xuất
      </Button>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Quản lý sinh viên" {...a11yProps(0)} />
          <Tab label="Quản lý giảng viên" {...a11yProps(1)} />
          <Tab label="Quản lý môn học" {...a11yProps(2)} />
          <Tab label="Quản lý lớp học phần" {...a11yProps(3)} />
          <Tab label="Quản lý lịch học" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <StudentManagement />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <LecturerManagement />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <CourseManagement />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <ClassManagement />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <ScheduleManagement />
      </CustomTabPanel>
      <ToastContainer />
    </Box>
  );
};

export default Admin;
