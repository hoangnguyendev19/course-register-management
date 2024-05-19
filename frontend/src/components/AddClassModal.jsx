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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 500,
  // scroll
  overflow: "auto",
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

const AddClassModal = ({
  open,
  setOpen,
  handleAdd,
  classTheory,
  courseList,
  lecturerList,
}) => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState(
    courseList.length > 0 ? courseList[0].id : ""
  );
  const [lecturer, setLecturer] = useState(
    lecturerList.length > 0 ? lecturerList[0].id : ""
  );
  const [capacity, setCapacity] = useState(0);
  const [type, setType] = useState("theory"); // theory or practice
  const [theory, setTheory] = useState(
    classTheory.length > 0 ? classTheory[0].id : ""
  );
  const [disableTheory, setDisableTheory] = useState(true);
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  const handleType = (event) => {
    setType(event.target.value);
    if (event.target.value === "practice") {
      setDisableTheory(false);
    } else {
      setDisableTheory(true);
    }
  };

  const handleSubmit = () => {
    const newClass = {
      name,
      course,
      lecturer,
      capacity,
      type,
      theory,
      startDate: startDate.format("YYYY-MM-DD"),
      endDate: endDate.format("YYYY-MM-DD"),
    };
    handleAdd(newClass);
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
          Thêm lớp học phần
        </Typography>
        <Divider />
        <Box sx={{ margin: "20px 0" }}>
          <Box sx={{ marginBottom: "10px" }}>
            <Typography fontSize="16px">
              Tên lớp<span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              id="name"
              placeholder="Nhập tên lớp"
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
          </Box>
          <Box sx={{ marginBottom: "10px" }}>
            <Typography fontSize="16px">
              Chọn môn học<span style={{ color: "red" }}>*</span>
            </Typography>
            <Select
              value={course}
              fullWidth
              onChange={(e) => setCourse(e.target.value)}
            >
              {courseList.map((course) => (
                <MenuItem key={course.id} value={course.id}>
                  {course.id} - {course.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box sx={{ marginBottom: "10px" }}>
            <Typography fontSize="16px">
              Chọn giảng viên<span style={{ color: "red" }}>*</span>
            </Typography>
            <Select
              value={lecturer}
              fullWidth
              onChange={(e) => setLecturer(e.target.value)}
            >
              {lecturerList.map((lecturer) => (
                <MenuItem key={lecturer.id} value={lecturer.id}>
                  {lecturer.id} - {lecturer.fullName}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box sx={{ marginBottom: "10px" }}>
            <Typography fontSize="16px">
              Sĩ số tối đa<span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              id="capacity"
              placeholder="Nhập sĩ số tối đa"
              variant="standard"
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              fullWidth
            />
          </Box>
          <Box sx={{ marginBottom: "10px" }}>
            <Typography fontSize="16px">
              Chọn loại môn học<span style={{ color: "red" }}>*</span>
            </Typography>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={type}
              name="radio-buttons-group"
              value={type}
              onChange={handleType}
              sx={{ display: "flex", flexDirection: "row" }}
            >
              <FormControlLabel
                value="theory"
                control={<Radio />}
                label="Lý thuyết"
              />
              <FormControlLabel
                value="practice"
                control={<Radio />}
                label="Thực hành"
              />
            </RadioGroup>
          </Box>
          <Box sx={{ marginBottom: "10px" }}>
            <Typography fontSize="16px">
              Chọn lớp lý thuyết
              <span style={{ color: "red" }}>
                (Bắt buộc nếu đây là lớp thực hành)
              </span>
            </Typography>
            <Select
              value={theory}
              fullWidth
              onChange={(e) => setTheory(e.target.value)}
              disabled={disableTheory}
            >
              {classTheory.map((theory) => (
                <MenuItem key={theory.id} value={theory.id}>
                  {theory.id}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box sx={{ marginBottom: "10px" }}>
            <Typography fontSize="16px">
              Chọn ngày bắt đầu<span style={{ color: "red" }}>*</span>
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  value={startDate}
                  format="DD/MM/YYYY"
                  onChange={(newValue) => setStartDate(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
          <Box sx={{ marginBottom: "10px" }}>
            <Typography fontSize="16px">
              Chọn ngày kết thúc<span style={{ color: "red" }}>*</span>
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  value={endDate}
                  format="DD/MM/YYYY"
                  onChange={(newValue) => setEndDate(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
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

export default AddClassModal;
