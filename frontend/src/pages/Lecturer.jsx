import LogoutIcon from "@mui/icons-material/Logout";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { logout } from "../redux/userSlice";
import LecturerAPI from "../api/LecturerAPI";
import Profile from "../components/Profile";
import DepartmentAPI from "../api/DepartmentAPI";
import { setDepartments } from "../redux/departmentSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LecturerCalendar from "../components/LecturerCalendar";

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

const Lecturer = () => {
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
    LecturerAPI.logout();
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
          <Tab label="Lịch dạy học" {...a11yProps(0)} />
          <Tab label="Thông tin cá nhân" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <LecturerCalendar />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Profile role={"lecturer"} />
      </CustomTabPanel>
      <ToastContainer />
    </Box>
  );
};

export default Lecturer;
