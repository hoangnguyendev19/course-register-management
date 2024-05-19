import {
  Box,
  Button,
  Divider,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
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

const AddCourseModal = ({ open, setOpen, handleAdd, courseList }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [credit, setCredit] = useState(0);
  const [prerequisite, setPrerequisite] = useState(null);

  const handleSubmit = () => {
    if (!name || !description || !credit) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (credit <= 0) {
      toast.error("Số tín chỉ phải lớn hơn 0");
      return;
    }

    if (name === prerequisite) {
      toast.error("Môn tiên quyết phải khác môn học hiện tại");
      return;
    }

    handleAdd({ name, description, credit, prerequisite });
    setName("");
    setDescription("");
    setCredit(0);
    setPrerequisite(null);
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
          Thêm môn học
        </Typography>
        <Divider />
        <Box sx={{ margin: "20px 0" }}>
          <Box sx={{ marginBottom: "10px" }}>
            <Typography fontSize="16px">
              Tên môn học<span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              id="name"
              placeholder="Nhập tên môn học"
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
          </Box>
          <Box sx={{ marginBottom: "10px" }}>
            <Typography fontSize="16px">
              Mô tả<span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              id="description"
              placeholder="Nhập mô tả"
              variant="standard"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
            />
          </Box>
          <Box sx={{ marginBottom: "10px" }}>
            <Typography fontSize="16px">
              Số tín chỉ<span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              id="credit"
              placeholder="Nhập số tín chỉ"
              variant="standard"
              type="number"
              value={credit}
              onChange={(e) => setCredit(e.target.value)}
              fullWidth
            />
          </Box>
          <Box sx={{ marginBottom: "10px" }}>
            <Typography fontSize="16px">
              Môn tiên quyết<span style={{ color: "red" }}>(Nếu có)</span>
            </Typography>
            <Select
              value={prerequisite}
              fullWidth
              onChange={(e) => setPrerequisite(e.target.value)}
            >
              {courseList.map((course) => (
                <MenuItem key={course.id} value={course.id}>
                  {course.id} - {course.name}
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

export default AddCourseModal;
