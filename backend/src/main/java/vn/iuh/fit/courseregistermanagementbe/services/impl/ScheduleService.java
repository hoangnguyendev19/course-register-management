package vn.iuh.fit.courseregistermanagementbe.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.iuh.fit.courseregistermanagementbe.models.Schedule;
import vn.iuh.fit.courseregistermanagementbe.repositories.ClazzRepository;
import vn.iuh.fit.courseregistermanagementbe.repositories.EnrollmentRepository;
import vn.iuh.fit.courseregistermanagementbe.repositories.ScheduleRepository;
import vn.iuh.fit.courseregistermanagementbe.services.IScheduleService;

import java.util.List;

@Service
public class ScheduleService implements IScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private ClazzRepository clazzRepository;

    @Override
    public List<Schedule> findAll() {
        return scheduleRepository.findAll();
    }

    @Override
    public List<Schedule> findAllByClazzId(String clazzId) {
        return scheduleRepository.findAllByClazzId(clazzId);
    }

    @Override
    public List<Schedule> findAllByStudentId(String studentId) {
        List<String> clazzIds = enrollmentRepository.findAllByStudentId(studentId).stream().map(enrollment -> enrollment.getClazz().getId()).toList();
        return scheduleRepository.findAllByClazzIn(clazzIds);
    }

    @Override
    public List<Schedule> findAllByLecturerId(String lecturerId) {
        List<String> clazzIds = clazzRepository.findAllByLecturerId(lecturerId).stream().map(clazz -> clazz.getId()).toList();
        return scheduleRepository.findAllByClazzIn(clazzIds);
    }

    @Override
    public Schedule findById(int id) {
        return scheduleRepository.findById(id).orElse(null);
    }

    @Override
    public boolean save(Schedule schedule) {
        return scheduleRepository.save(schedule) != null;
    }

    @Override
    public void delete(int id) {
        scheduleRepository.deleteById(id);
    }
}
