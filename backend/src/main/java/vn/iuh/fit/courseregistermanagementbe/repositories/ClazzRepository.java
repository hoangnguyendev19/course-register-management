package vn.iuh.fit.courseregistermanagementbe.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.iuh.fit.courseregistermanagementbe.enums.EClassType;
import vn.iuh.fit.courseregistermanagementbe.models.Clazz;

import java.util.List;

@Repository
public interface ClazzRepository extends JpaRepository<Clazz, String> {
    List<Clazz> findAllBySemesterId(int semesterId);
    List<Clazz> findAllBySemesterIdAndType(int semesterId, EClassType type);
    List<Clazz> findAllBySemesterIdAndCourseId(int semesterId, String courseId);
    List<Clazz> findAllByLecturerId(String lecturerId);
    boolean existsById(String id);
}
