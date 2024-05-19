import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

const AddUserModal = ({ open, setOpen, handleAdd }) => {
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("male");
  const [dob, setDob] = useState(dayjs());
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const { departments } = useSelector((state) => state.department);

  const handleSubmit = async () => {
    if (!fullName || !email || !phone) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (
      !/^[a-zA-Z\sáàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđĐ]+$/.test(
        fullName
      )
    ) {
      toast.error("Họ và tên không hợp lệ");
      return;
    }

    // convert first letter of each word to uppercase
    const name = fullName
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
      .join(" ");

    setFullName(name);

    // dob must be >= 18 years ago 
    if (dayjs().diff(dob, "year") < 18) {
      toast.error("Phải đủ 18 tuổi trở lên");
      return;
    }

    // email must be in correct format (ds23.abc@xyz.jh99.hb)
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      toast.error("Email không hợp lệ");
      return;
    }

    // phone must be 10 digits and start with 0
    if (!/^0\d{9}$/.test(phone)) {
      toast.error("Số điện thoại không hợp lệ");
      return;
    }

    // department must be selected
    if (!department) {
      toast.error("Vui lòng chọn khoa");
      return;
    }

    const newUser = {
      fullName,
      gender,
      dob: dob.format("YYYY-MM-DD"),
      email,
      phone,
      department,
    };

    handleAdd(newUser);

    setFullName("");
    setGender("male");
    setDob(dayjs());
    setEmail("");
    setPhone("");
    setDepartment("");
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          fontWeight="bold"
        >
          Thêm sinh viên hoặc giảng viên
        </Typography>
        <Divider />
        <Box sx={{ margin: "20px 0" }}>
          <Box sx={{ marginBottom: "10px" }}>
            <Typography fontSize="16px">
              Họ và tên<span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              id="fullName"
              placeholder="Nhập họ và tên"
              variant="standard"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              fullWidth
            />
          </Box>
          <Box sx={{ marginBottom: "10px" }}>
            <Typography fontSize="16px">
              Giới tính<span style={{ color: "red" }}>*</span>
            </Typography>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={gender}
              name="radio-buttons-group"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              sx={{ display: "flex", flexDirection: "row" }}
            >
              <FormControlLabel value="male" control={<Radio />} label="Nam" />
              <FormControlLabel value="female" control={<Radio />} label="Nữ" />
            </RadioGroup>
          </Box>
          <Box sx={{ marginBottom: "10px" }}>
            <Typography fontSize="16px">
              Ngày sinh<span style={{ color: "red" }}>*</span>
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  value={dob}
                  format="DD/MM/YYYY"
                  onChange={(newValue) => setDob(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
          <Box sx={{ marginBottom: "10px" }}>
            <Typography fontSize="16px">
              Email<span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              id="email"
              placeholder="Nhập email"
              variant="standard"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          </Box>
          <Box sx={{ marginBottom: "10px" }}>
            <Typography fontSize="16px">
              Số điện thoại<span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              id="phone"
              placeholder="Nhập số điện thoại"
              variant="standard"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
            />
          </Box>
          <Box sx={{ marginBottom: "10px" }}>
            <Typography fontSize="16px">
              Khoa<span style={{ color: "red" }}>*</span>
            </Typography>
            <Select
              value={department}
              fullWidth
              onChange={(e) => setDepartment(e.target.value)}
            >
              {departments?.map((department) => (
                <MenuItem key={department.id} value={department.id}>
                  {department.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="outlined"
            sx={{ mr: 1 }}
            onClick={() => setOpen(false)}
          >
            Huỷ
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Thêm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddUserModal;
