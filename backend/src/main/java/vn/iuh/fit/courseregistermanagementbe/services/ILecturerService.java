package vn.iuh.fit.courseregistermanagementbe.services;

import vn.iuh.fit.courseregistermanagementbe.models.Lecturer;
import vn.iuh.fit.courseregistermanagementbe.models.Student;

import java.util.List;

public interface ILecturerService {
    List<Lecturer> findAll();
    Lecturer findById(String id);
    Lecturer findByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);
    boolean existsById(String id);
    boolean save(Lecturer lecturer);
    void deleteById(String id);
}
