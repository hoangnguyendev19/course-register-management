package vn.iuh.fit.courseregistermanagementbe.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.iuh.fit.courseregistermanagementbe.models.Semester;

@Repository
public interface SemesterRepository extends JpaRepository<Semester, Integer> {
}
