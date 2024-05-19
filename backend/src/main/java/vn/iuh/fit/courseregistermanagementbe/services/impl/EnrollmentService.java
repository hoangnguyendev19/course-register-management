package vn.iuh.fit.courseregistermanagementbe.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.iuh.fit.courseregistermanagementbe.models.Enrollment;
import vn.iuh.fit.courseregistermanagementbe.models.EnrollmentId;
import vn.iuh.fit.courseregistermanagementbe.repositories.EnrollmentRepository;
import vn.iuh.fit.courseregistermanagementbe.services.IEnrollmentService;
import java.util.List;

@Service
public class EnrollmentService implements IEnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Override
    public List<Enrollment> findAllByStudentId(String studentId) {
        return enrollmentRepository.findAllByStudentId(studentId);
    }

    @Override
    public boolean save(Enrollment enrollment) {
        return enrollmentRepository.save(enrollment) != null;
    }

    @Override
    public void deleteById(EnrollmentId id) {
        enrollmentRepository.deleteById(id);
    }
}
