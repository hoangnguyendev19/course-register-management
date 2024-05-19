package vn.iuh.fit.courseregistermanagementbe.services;

import vn.iuh.fit.courseregistermanagementbe.models.Semester;

import java.util.List;

public interface ISemesterService {
    List<Semester> findAll();
    Semester findById(int id);
}
