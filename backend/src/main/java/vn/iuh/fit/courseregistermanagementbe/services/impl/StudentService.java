package vn.iuh.fit.courseregistermanagementbe.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.iuh.fit.courseregistermanagementbe.models.Student;
import vn.iuh.fit.courseregistermanagementbe.repositories.StudentRepository;
import vn.iuh.fit.courseregistermanagementbe.services.IStudentService;

import java.util.List;

@Service
public class StudentService implements IStudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public List<Student> findAll() {
        return studentRepository.findAll();
    }

    @Override
    public Student findById(String id) {
        return studentRepository.findById(id).orElse(null);
    }

    @Override
    public Student findByUsername(String username) {
        return studentRepository.findByUsername(username) != null ? studentRepository.findByUsername(username) : null;
    }

    @Override
    public boolean existsByEmail(String email) {
        return studentRepository.existsByEmail(email);
    }

    @Override
    public boolean existsByPhone(String phone) {
        return studentRepository.existsByPhone(phone);
    }

    @Override
    public boolean existsById(String id) {
        return studentRepository.existsById(id);
    }

    @Override
    public boolean save(Student student) {
        return studentRepository.save(student) != null;
    }

    @Override
    public void deleteById(String id) {
        studentRepository.deleteById(id);
    }

}
