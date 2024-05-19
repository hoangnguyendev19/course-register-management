package vn.iuh.fit.courseregistermanagementbe.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.iuh.fit.courseregistermanagementbe.models.Semester;
import vn.iuh.fit.courseregistermanagementbe.repositories.SemesterRepository;
import vn.iuh.fit.courseregistermanagementbe.services.ISemesterService;

import java.util.List;

@Service
public class SemesterService implements ISemesterService {

    @Autowired
    private SemesterRepository semesterRepository;

    @Override
    public List<Semester> findAll() {
        return semesterRepository.findAll();
    }

    @Override
    public Semester findById(int id) {
        return semesterRepository.findById(id).orElse(null);
    }
}
