import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
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

const EditProfile = ({ open, setOpen, user, handleEdit }) => {
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("male");
  const [dob, setDob] = useState(dayjs());
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (user) {
      setFullName(user.fullName);
      if (user.gender === "male" || user.gender === "female") {
        setGender(user.gender);
      } else {
        setGender(user.gender === "Nam" ? "male" : "female");
      }
      setDob(dayjs(user.dateOfBirth.split("/").reverse().join("-")));
      setEmail(user.email);
      setPhone(user.phone);
    }
  }, [user]);

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

    if (!/^\d{10}$/.test(phone)) {
      toast.error("Số điện thoại không hợp lệ");
      return;
    }

    const newUser = {
      fullName,
      gender,
      dob: dob.format("YYYY-MM-DD"),
      email,
      phone,
    };

    handleEdit(user.id, newUser);

    setFullName("");
    setGender("male");
    setDob(dayjs());
    setEmail("");
    setPhone("");
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
          Cập nhật thông tin
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
            Cập nhật
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditProfile;
