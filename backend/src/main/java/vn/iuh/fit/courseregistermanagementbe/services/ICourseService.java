package vn.iuh.fit.courseregistermanagementbe.services;

import vn.iuh.fit.courseregistermanagementbe.models.Course;

import java.util.List;

public interface ICourseService {
    List<Course> findAll();

    Course findByName(String name);
    Course findById(String id);
     boolean existsById(String id);
    boolean save(Course course);
    void deleteById(String id);
}
