package vn.iuh.fit.courseregistermanagementbe.services;

import vn.iuh.fit.courseregistermanagementbe.models.Department;

import java.util.List;

public interface IDepartmentService {
    List<Department> findAll();
    Department findById(String id);
}
