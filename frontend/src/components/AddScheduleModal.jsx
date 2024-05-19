import {
  Box,
  Button,
  Divider,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { useState } from "react";

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

const AddScheduleModal = ({ open, setOpen, handleAdd, classList }) => {
  const [name, setName] = useState("");
  const [clazz, setClazz] = useState("");
  const [room, setRoom] = useState("");
  const [time, setTime] = useState(dayjs());

  const handleSubmit = () => {
    const newSchedule = {
      name,
      clazz,
      room,
      time: time.format("YYYY-MM-DD"),
    };

    handleAdd(newSchedule);
    setName("");
    setClazz("");
    setRoom("");
    setTime(dayjs());
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
          Thêm lịch học
        </Typography>
        <Divider />
        <Box sx={{ margin: "20px 0" }}>
          <Box sx={{ marginBottom: "10px" }}>
            <Typography fontSize="16px">
              Chon tiết học<span style={{ color: "red" }}>*</span>
            </Typography>
            <Select
              value={name}
              fullWidth
              onChange={(e) => setName(e.target.value)}
            >
              <MenuItem value="morning">Buổi sáng</MenuItem>
              <MenuItem value="afternoon">Buổi chiều</MenuItem>
              <MenuItem value="evening">Buổi tối</MenuItem>
            </Select>
          </Box>
          <Box sx={{ marginBottom: "10px" }}>
            <Typography fontSize="16px">
              Chọn lớp học phần<span style={{ color: "red" }}>*</span>
            </Typography>
            <Select
              value={clazz}
              fullWidth
              onChange={(e) => setClazz(e.target.value)}
            >
              {classList.map((clazz) => (
                <MenuItem key={clazz.id} value={clazz.id}>
                  {clazz.id} - {clazz.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box sx={{ marginBottom: "10px" }}>
            <Typography fontSize="16px">
              Chọn phòng<span style={{ color: "red" }}>*</span>
            </Typography>
            <Select
              value={room}
              fullWidth
              onChange={(e) => setRoom(e.target.value)}
            >
              <MenuItem value="H201">H201</MenuItem>
              <MenuItem value="H202">H202</MenuItem>
              <MenuItem value="H301">H301</MenuItem>
              <MenuItem value="H302">H302</MenuItem>
              <MenuItem value="H401">H401</MenuItem>
              <MenuItem value="H402">H402</MenuItem>
            </Select>
          </Box>
          <Box sx={{ marginBottom: "10px" }}>
            <Typography fontSize="16px">
              Thời gian<span style={{ color: "red" }}>*</span>
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  value={time}
                  format="DD/MM/YYYY"
                  onChange={(newValue) => setTime(newValue)}
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

export default AddScheduleModal;
