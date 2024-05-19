package vn.iuh.fit.courseregistermanagementbe.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.iuh.fit.courseregistermanagementbe.models.Department;
import vn.iuh.fit.courseregistermanagementbe.repositories.DepartmentRepository;
import vn.iuh.fit.courseregistermanagementbe.services.IDepartmentService;

import java.util.List;

@Service
public class DepartmentService implements IDepartmentService {
    @Autowired
    private DepartmentRepository departmentRepository;

    @Override
    public List<Department> findAll() {
        return departmentRepository.findAll();
    }

    @Override
    public Department findById(String id) {
        return departmentRepository.findById(id).orElse(null);
    }
}
