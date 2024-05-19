package vn.iuh.fit.courseregistermanagementbe.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.iuh.fit.courseregistermanagementbe.models.Lecturer;
import vn.iuh.fit.courseregistermanagementbe.repositories.LecturerRepository;
import vn.iuh.fit.courseregistermanagementbe.services.ILecturerService;

import java.util.List;

@Service
public class LecturerService implements ILecturerService {

    @Autowired
    private LecturerRepository lecturerRepository;


    @Override
    public List<Lecturer> findAll() {
        return lecturerRepository.findAll();
    }

    @Override
    public Lecturer findById(String id) {
        return lecturerRepository.findById(id).orElse(null);
    }

    @Override
    public Lecturer findByUsername(String username) {
        return lecturerRepository.findByUsername(username) != null ? lecturerRepository.findByUsername(username) : null;
    }

    @Override
    public boolean existsByEmail(String email) {
        return lecturerRepository.existsByEmail(email);
    }

    @Override
    public boolean existsByPhone(String phone) {
        return lecturerRepository.existsByPhone(phone);
    }

    @Override
    public boolean existsById(String id) {
        return lecturerRepository.existsById(id);
    }

    @Override
    public boolean save(Lecturer lecturer) {
        return lecturerRepository.save(lecturer) != null;
    }

    @Override
    public void deleteById(String id) {
        lecturerRepository.deleteById(id);
    }
}
