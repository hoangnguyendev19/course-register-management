package vn.iuh.fit.courseregistermanagementbe.services;

import vn.iuh.fit.courseregistermanagementbe.models.Schedule;

import java.util.List;

public interface IScheduleService {
    List<Schedule> findAll();
    List<Schedule> findAllByClazzId(String clazzId);
    List<Schedule> findAllByStudentId(String studentId);
    List<Schedule> findAllByLecturerId(String lecturerId);
    Schedule findById(int id);
    boolean save(Schedule schedule);
    void delete(int id);
}
