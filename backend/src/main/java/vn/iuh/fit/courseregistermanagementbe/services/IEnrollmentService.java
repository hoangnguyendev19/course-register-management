package vn.iuh.fit.courseregistermanagementbe.services;

import vn.iuh.fit.courseregistermanagementbe.models.Enrollment;
import vn.iuh.fit.courseregistermanagementbe.models.EnrollmentId;

import java.util.List;

public interface IEnrollmentService {
    List<Enrollment> findAllByStudentId(String studentId);
    boolean save(Enrollment enrollment);
    void deleteById(EnrollmentId id);
}
