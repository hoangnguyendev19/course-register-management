package vn.iuh.fit.courseregistermanagementbe.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.iuh.fit.courseregistermanagementbe.enums.EClassType;
import vn.iuh.fit.courseregistermanagementbe.models.Clazz;
import vn.iuh.fit.courseregistermanagementbe.repositories.ClazzRepository;
import vn.iuh.fit.courseregistermanagementbe.services.IClazzService;

import java.util.List;

@Service
public class ClazzService implements IClazzService {

    @Autowired
    private ClazzRepository clazzRepository;

    @Override
    public List<Clazz> findAll() {
        return clazzRepository.findAll();
    }

    @Override
    public List<Clazz> findAllBySemesterId(int semesterId) {
        return clazzRepository.findAllBySemesterId(semesterId);
    }

    @Override
    public List<Clazz> findAllBySemesterIdAndType(int semesterId, EClassType type) {
        return clazzRepository.findAllBySemesterIdAndType(semesterId, type);
    }

    @Override
    public List<Clazz> findAllBySemesterIdAndCourseId(int semesterId, String courseId) {
        return clazzRepository.findAllBySemesterIdAndCourseId(semesterId, courseId);
    }

    @Override
    public Clazz findById(String id) {
        return clazzRepository.findById(id).orElse(null);
    }

    @Override
    public boolean existsById(String id) {
        return clazzRepository.existsById(id);
    }

    @Override
    public boolean save(Clazz clazz) {
        return clazzRepository.save(clazz) != null;
    }

    @Override
    public void deleteById(String id) {
        clazzRepository.deleteById(id);
    }
}
