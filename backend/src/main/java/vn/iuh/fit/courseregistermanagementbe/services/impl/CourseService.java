package vn.iuh.fit.courseregistermanagementbe.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.iuh.fit.courseregistermanagementbe.models.Course;
import vn.iuh.fit.courseregistermanagementbe.repositories.CourseRepository;
import vn.iuh.fit.courseregistermanagementbe.services.ICourseService;

import java.util.List;

@Service
public class CourseService implements ICourseService {

    @Autowired
    private CourseRepository courseRepository;
    @Override
    public List<Course> findAll() {
        return courseRepository.findAll();
    }

    @Override
    public Course findByName(String name) {
        return courseRepository.findByName(name);
    }

    @Override
    public Course findById(String id) {
        return courseRepository.findById(id).orElse(null);
    }

    @Override
    public boolean existsById(String id) {
        return courseRepository.existsById(id);
    }

    @Override
    public boolean save(Course course) {
        return courseRepository.save(course) != null;
    }

    @Override
    public void deleteById(String id) {
        courseRepository.deleteById(id);
    }
}
