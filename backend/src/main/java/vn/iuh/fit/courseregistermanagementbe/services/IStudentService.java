package vn.iuh.fit.courseregistermanagementbe.services;

import vn.iuh.fit.courseregistermanagementbe.models.Student;

import java.util.List;

public interface IStudentService {
    List<Student> findAll();
    Student findById(String id);
    Student findByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);
    boolean existsById(String id);
    boolean save(Student student);
    void deleteById(String id);
}
