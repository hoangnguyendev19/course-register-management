package vn.iuh.fit.courseregistermanagementbe.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.iuh.fit.courseregistermanagementbe.models.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, String> {
    Student findByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);
    boolean existsById(String id);
    void deleteById(String id);
}
