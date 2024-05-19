import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import { updateProfile } from "../redux/userSlice";
import { useState } from "react";
import StudentAPI from "../api/StudentAPI";
import LecturerAPI from "../api/LecturerAPI";
import { toast } from "react-toastify";

const Profile = ({ role }) => {
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleEdit = async (id, newUser) => {
    let data = null;
    if (role === "student") {
      data = await StudentAPI.updateStudent(id, newUser);
    } else {
      data = await LecturerAPI.updateLecturer(id, newUser);
    }

    if (data) {
      dispatch(updateProfile(data));
      toast.success("Cập nhật người dùng thành công");
    } else {
      toast.error("Cập nhật người dùng thất bại");
    }
  };

  return (
    <Box sx={{ margin: "20px 0" }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Typography fontSize={18} fontWeight="bold">
            Mã số
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography fontSize={18} fontStyle="italic">
            {user?.id}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography fontSize={18} fontWeight="bold">
            Họ và tên
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography fontSize={18} fontStyle="italic">
            {user?.fullName}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography fontSize={18} fontWeight="bold">
            Giới tính
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography fontSize={18} fontStyle="italic">
            {user?.gender === "male" ? "Nam" : "Nữ"}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography fontSize={18} fontWeight="bold">
            Ngày sinh
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography fontSize={18} fontStyle="italic">
            {dayjs(user?.dateOfBirth).format("DD/MM/YYYY")}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography fontSize={18} fontWeight="bold">
            Email
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography fontSize={18} fontStyle="italic">
            {user?.email}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography fontSize={18} fontWeight="bold">
            Số điện thoại
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography fontSize={18} fontStyle="italic">
            {user?.phone}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography fontSize={18} fontWeight="bold">
            Khoa
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography fontSize={18} fontStyle="italic">
            {user?.department}
          </Typography>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        sx={{ mt: "40px" }}
        onClick={() => setOpen(true)}
      >
        Cập nhật
      </Button>
      <EditProfile
        open={open}
        setOpen={setOpen}
        user={user}
        handleEdit={handleEdit}
      />
    </Box>
  );
};

export default Profile;
