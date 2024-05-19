package vn.iuh.fit.courseregistermanagementbe.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.iuh.fit.courseregistermanagementbe.dto.SemesterDTO;
import vn.iuh.fit.courseregistermanagementbe.models.ResponseObject;
import vn.iuh.fit.courseregistermanagementbe.services.ISemesterService;
import vn.iuh.fit.courseregistermanagementbe.utils.Handler;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping(path = "/api/v1/semesters")
public class SemesterController {

    @Autowired
    private ISemesterService semesterService;

    @GetMapping
    public ResponseEntity<ResponseObject> findAll() {
        try {
            List<SemesterDTO> semesterDTOList = semesterService.findAll().stream().map(Handler::convertSemesterToSemesterDTO).toList();
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("success", "Get all semesters successfully", semesterDTOList)
            );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("error", "Get all semesters failed", null)
            );
        }
    }
}
