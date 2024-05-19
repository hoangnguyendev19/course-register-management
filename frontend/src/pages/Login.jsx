import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StudentAPI from "../api/StudentAPI";
import LecturerAPI from "../api/LecturerAPI";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

import iuh from "../assets/iuh.png";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("password");
  const [userType, setUserType] = useState("student"); // [student, lecturer]
  const [tabs, setTab] = useState("new"); //[new,infor]
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (username === "" || password === "") {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    const regex = /^\d{8}$/;
    const isValidUsername = regex.test(username);

    if (!isValidUsername) {
      toast.error("Tên tài khoản phải là số có 8 chữ số!");
      return;
    }
    if (userType === "student") {
      const data = await StudentAPI.login(username, password);
      if (data) {
        dispatch(login(data));
        navigate("/student");
      } else {
        toast.error("Tên tài khoản hoặc mật khẩu không chính xác!");
      }
      return;
    }

    if (userType === "lecturer") {
      const data = await LecturerAPI.login(username, password);
      if (data) {
        dispatch(login(data));
        if (data.admin === true) {
          navigate("/admin");
        } else {
          navigate("/lecturer");
        }
      } else {
        toast.error("Tên tài khoản hoặc mật khẩu không chính xác!");
      }
      return;
    }
  };

  const contenNnew = [
    {
      date: "2024-5-11",
      title:
        "Thông báo v/v đăng ký học phần và đóng học phí học kỳ 2, năm học 2023 – 2024",
      description:
        "Thông báo v/v đăng ký học phần và đóng học phí học kỳ 2, năm học 2023 – 2024",
    },
    {
      date: "2023-6-11",
      title:
        "Thông báo v/v đăng ký học phần và đóng học phí học kỳ 1, năm học 2023 – 2024",
      description:
        "Thông báo v/v đăng ký học phần và đóng học phí học kỳ 1, năm học 2023 – 2024",
    },
    {
      date: "2024-5-12",
      title:
        "IUH đón nhận chứng nhận 04 chương trình đào tạo đạt chuẩn AUN-QA và Gặp mặt truyền thống nhân ngày Nhà giáo Việt Nam 20/11",
      description:
        "Chiều ngày 19/11/2019, Trường Đại học Công nghiệp Thành phố Hồ Chí Minh đã long trọng tổ chức ",
    },
    {
      date: "2024-5-12",
      title:
        "IUH đón nhận chứng nhận 04 chương trình đào tạo đạt chuẩn AUN-QA và Gặp mặt truyền thống nhân ngày Nhà giáo Việt Nam 20/11",
      description:
        "Chiều ngày 19/11/2019, Trường Đại học Công nghiệp Thành phố Hồ Chí Minh đã long trọng tổ chức ",
    },
  ];

  const contenInfor = [
    {
      date: "2024-5-11",
      title: "THÔNG TIN GIỜ HỌC",
      description:
        "Giờ học và giờ thi tại Trường Đại học Công nghiệp Thành phố Hồ Chí Minh",
    },
  ];
  return (
    <Box>
      <Box
        sx={{
          justifyContent: "center",
          width: "100%",
          boxShadow: "0px 1px 5px 2px rgb(191, 211, 222)",
          alignItems: "center",
          display: "flex",
          marginBottom: "15px",
          padding: "5px 0 5px 0",
        }}
      >
        <img src={iuh} alt="logo" sx={{ height: "100%", width: "auto" }} />
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: "70%" }}>
          <Tabs value={tabs} onChange={(e, newValue) => setTab(newValue)}>
            <Tab
              label="TIN TỨC - SỰ KiỆN"
              sx={{ fontSize: "20px", fontWeight: 700 }}
              value="new"
            />
            <Tab
              label="THÔNG TIN GIỜ HỌC"
              sx={{ fontSize: "20px", fontWeight: 700 }}
              value="infor"
            />
          </Tabs>
          {tabs === "new" && (
            <Box
              sx={{
                marginTop: "10px",
                maxHeight: "350px",
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#888",
                  borderRadius: "4px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#555",
                  cursor: "pointer",
                },
              }}
            >
              {contenNnew.map((value, index) => {
                return (
                  <Box
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      padding: "15px",
                      marginBottom: "15px",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    <Typography
                      style={{
                        marginRight: "15px",
                        color: "#007bff",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      {value.date}
                    </Typography>
                    <Box style={{ flex: 1 }}>
                      <Typography
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          marginBottom: "5px",
                        }}
                      >
                        {value.title}
                      </Typography>
                      <Typography>{value.description}</Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          )}
          {tabs === "infor" && (
            <Box
              sx={{
                marginTop: "10px",
                maxHeight: "350px",
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#888",
                  borderRadius: "4px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#555",
                  cursor: "pointer",
                },
              }}
            >
              {contenInfor.map((value, index) => {
                return (
                  <Box
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      padding: "15px",
                      marginBottom: "15px",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    <Typography
                      style={{
                        marginRight: "15px",
                        color: "#007bff",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      {value.date}
                    </Typography>
                    <Box style={{ flex: 1 }}>
                      <Typography
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          marginBottom: "5px",
                        }}
                      >
                        {value.title}
                      </Typography>
                      <Typography>{value.description}</Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>

        <Box
          sx={{
            textAlign: "start",
            border: "1px solid black",
            borderRadius: "5px",
            width: "auto",
            minWidth: "25%",
            padding: "20px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            margin: "15px auto",
          }}
        >
          <Typography
            fontSize="20px"
            style={{
              textAlign: "center",
              marginBottom: "20px",
              fontWeight: 700,
              color: "#007bff",
            }}
          >
            ĐĂNG NHẬP HỆ THỐNG
          </Typography>
          <Box>
            <Typography fontSize="14px">
              Tên tài khoản<span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              id="username"
              placeholder="Nhập mã sinh viên hoặc mã giảng viên"
              variant="standard"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              style={{ marginBottom: "20px" }}
            />
          </Box>
          <Box
            sx={{
              position: "relative",
            }}
          >
            <Typography fontSize="14px">
              Mật khẩu<span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              id="password"
              placeholder="Nhập mật khẩu"
              type={showPassword}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="standard"
              fullWidth
              style={{ marginBottom: "20px" }}
            />
            {showPassword === "password" ? (
              <VisibilityIcon
                onClick={() => setShowPassword("text")}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "20px",
                  cursor: "pointer",
                }}
              />
            ) : (
              <VisibilityOffIcon
                onClick={() => setShowPassword("password")}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "20px",
                  cursor: "pointer",
                }}
              />
            )}
          </Box>
          <Box>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={"student"}
              name="radio-buttons-group"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              sx={{ display: "flex", flexDirection: "row" }}
            >
              <FormControlLabel
                value="student"
                control={<Radio />}
                label="Sinh viên"
              />
              <FormControlLabel
                value="lecturer"
                control={<Radio />}
                label="Giảng viên"
              />
            </RadioGroup>
          </Box>
          <Button
            variant="contained"
            fullWidth
            style={{ margin: "20px 0" }}
            onClick={handleSubmit}
          >
            Đăng nhập
          </Button>
        </Box>
      </Box>

      <ToastContainer />
    </Box>
  );
};

export default Login;
