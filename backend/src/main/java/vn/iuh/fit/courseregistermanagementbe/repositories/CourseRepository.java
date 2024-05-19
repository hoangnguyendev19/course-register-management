package vn.iuh.fit.courseregistermanagementbe.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.iuh.fit.courseregistermanagementbe.models.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, String> {
    Course findByName(String name);
    boolean existsById(String id);
    void deleteById(String id);
}
