package vn.iuh.fit.courseregistermanagementbe.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.iuh.fit.courseregistermanagementbe.models.Lecturer;

@Repository
public interface LecturerRepository extends JpaRepository<Lecturer, String> {
    Lecturer findByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);
    boolean existsById(String id);
    void deleteById(String id);
}
