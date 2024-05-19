package vn.iuh.fit.courseregistermanagementbe.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.iuh.fit.courseregistermanagementbe.models.Department;

import java.util.List;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, String> {
}
