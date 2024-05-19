import LogoutIcon from "@mui/icons-material/Logout";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DepartmentAPI from "../api/DepartmentAPI";
import StudentAPI from "../api/StudentAPI";
import StudentCalendar from "../components/StudentCalendar";
import CourseRegister from "../components/CourseRegister";
import Profile from "../components/Profile";
import { setDepartments } from "../redux/departmentSlice";
import { logout } from "../redux/userSlice";

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

const Student = () => {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      const fetchData = async () => {
        const data = await DepartmentAPI.getAllDepartments();
        dispatch(setDepartments(data));
      };

      fetchData();
    }
  }, []);

  const handleLogout = () => {
    StudentAPI.logout();
    dispatch(logout());
    navigate("/");
  };

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
          <Tab label="Đăng ký học phần" {...a11yProps(0)} />
          <Tab label="Lịch học" {...a11yProps(1)} />
          <Tab label="Thông tin cá nhân" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <CourseRegister />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <StudentCalendar />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Profile role={"student"} />
      </CustomTabPanel>
      <ToastContainer />
    </Box>
  );
};

export default Student;
