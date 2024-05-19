package vn.iuh.fit.courseregistermanagementbe.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.iuh.fit.courseregistermanagementbe.dto.DepartmentDTO;
import vn.iuh.fit.courseregistermanagementbe.models.ResponseObject;
import vn.iuh.fit.courseregistermanagementbe.services.IDepartmentService;
import vn.iuh.fit.courseregistermanagementbe.utils.Handler;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping(path = "/api/v1/departments")
public class DepartmentController {

    @Autowired
    private IDepartmentService departmentService;

    @GetMapping
    public ResponseEntity<ResponseObject> findAll() {
        try {
            List<DepartmentDTO> departmentDTOs = departmentService.findAll().stream().map(Handler::convertDepartmentToDepartmentDTO).toList();
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("success", "Get all students successfully", departmentDTOs)
            );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("error", "Get all students failed", null)
            );
        }
    }
}
