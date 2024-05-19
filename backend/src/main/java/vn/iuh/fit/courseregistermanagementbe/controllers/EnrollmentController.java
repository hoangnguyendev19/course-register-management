package vn.iuh.fit.courseregistermanagementbe.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.iuh.fit.courseregistermanagementbe.dto.EnrollmentDTO;
import vn.iuh.fit.courseregistermanagementbe.enums.EClassType;
import vn.iuh.fit.courseregistermanagementbe.enums.EStatus;
import vn.iuh.fit.courseregistermanagementbe.models.*;
import vn.iuh.fit.courseregistermanagementbe.services.IClazzService;
import vn.iuh.fit.courseregistermanagementbe.services.IEnrollmentService;
import vn.iuh.fit.courseregistermanagementbe.services.IStudentService;
import vn.iuh.fit.courseregistermanagementbe.utils.Handler;

import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping(path = "/api/v1/enrollments")
public class EnrollmentController {

    @Autowired
    private IEnrollmentService enrollmentService;

    @Autowired
    private IStudentService studentService;

    @Autowired
    private IClazzService clazzService;

    @GetMapping
    public ResponseEntity<ResponseObject> findAll(@RequestParam String studentId) {
        try {
            List<EnrollmentDTO> enrollmentDTOList = enrollmentService.findAllByStudentId(studentId).stream().map(Handler::convertEnrollmentToEnrollmentDTO).toList();
            return ResponseEntity.status((HttpStatus.OK)).body(new ResponseObject("success", "Get all enrollments successfully", enrollmentDTOList));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseObject("error", "Get all enrollments failed", null));
        }
    }

    @PostMapping
    public ResponseEntity<ResponseObject> enroll(@RequestBody Object obj) {
        try {
            LinkedHashMap<String, String> map = (LinkedHashMap<String, String>) obj;
            Student student = studentService.findById(map.get("studentId"));
            Clazz clazz = clazzService.findById(map.get("clazzId"));
            if(student == null || clazz == null)
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseObject("error", "Student or clazz are not found", null));

            // Check if student has enrolled in this course
            boolean isCourseEnrolled = enrollmentService.findAllByStudentId(student.getId()).stream().map(Enrollment::getClazz).anyMatch(clz -> clz.getCourse().equals(clazz.getCourse()) && clz.getType().equals(clazz.getType()));
            if(isCourseEnrolled)
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseObject("error", "You have already enrolled in this course", null));

            // Check if clazz is practice then check if student has enrolled in theory
            if(clazz.getType() == EClassType.PRACTICE) {
                List<String> clazzIdList = enrollmentService.findAllByStudentId(student.getId()).stream().map(enrollment -> enrollment.getClazz().getId()).toList();
                boolean isTheoryEnrolled = clazzIdList.contains(clazz.getTheory());
                if(!isTheoryEnrolled)
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseObject("error", "You have to enroll in theory clazz before enroll in this practice clazz", null));
            }

            // Check if clazz has prerequisite
            if(clazz.getCourse().getPrerequisite() != null) {
                List<String> courseIdList = enrollmentService.findAllByStudentId(student.getId()).stream().map(enrollment -> enrollment.getClazz().getCourse().getId()).toList();
                // Check if prerequisite is satisfied
                boolean isPrerequisiteSatisfied = courseIdList.contains(clazz.getCourse().getPrerequisite());
                if(!isPrerequisiteSatisfied)
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseObject("error", "You have to enroll in prerequisite course before enroll in this course", null));
            }

            // Check if current is less than capacity
            if(clazz.getCurrent() >= clazz.getCapacity())
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseObject("error", "This clazz is full", null));
            // Increase current student count of clazz
            clazz.setCurrent(clazz.getCurrent() + 1);
            clazzService.save(clazz);

            Enrollment enrollment = new Enrollment();
            enrollment.setStudent(student);
            enrollment.setClazz(clazz);
            enrollment.setCreatedAt(LocalDate.now());

            if (enrollmentService.save(enrollment)) {
                EnrollmentDTO enrollmentDTO = Handler.convertEnrollmentToEnrollmentDTO(enrollment);
                return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("success", "Enroll successfully", enrollmentDTO));
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseObject("error", "Enroll failed", null));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseObject("error", "Enroll failed", null));
        }
    }

    @DeleteMapping
    public ResponseEntity<ResponseObject> unenroll(@RequestParam String studentId, @RequestParam String clazzId) {
        try {
            Student student = studentService.findById(studentId);
            Clazz clazz = clazzService.findById(clazzId);
            // check if clazz status is closed then student cannot unenroll
            if(clazz.getStatus() == EStatus.CLOSE)
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseObject("error", "This clazz is closed", null));

            EnrollmentId enrollmentId = new EnrollmentId(clazz, student);
            // Decrease current student count of clazz
            clazz.setCurrent(clazz.getCurrent() - 1);
            clazzService.save(clazz);
            enrollmentService.deleteById(enrollmentId);

            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("success", "Unenroll successfully", null));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseObject("error", "Unenroll failed", null));
        }
    }
}
