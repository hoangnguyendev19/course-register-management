package vn.iuh.fit.courseregistermanagementbe.services;

import vn.iuh.fit.courseregistermanagementbe.enums.EClassType;
import vn.iuh.fit.courseregistermanagementbe.models.Clazz;

import java.util.List;

public interface IClazzService {
    List<Clazz> findAll();
    List<Clazz> findAllBySemesterId(int semesterId);
    List<Clazz> findAllBySemesterIdAndType(int semesterId, EClassType type);
    List<Clazz> findAllBySemesterIdAndCourseId(int semesterId, String courseId);
    Clazz findById(String id);
    boolean existsById(String id);
    boolean save(Clazz clazz);
    void deleteById(String id);
}
