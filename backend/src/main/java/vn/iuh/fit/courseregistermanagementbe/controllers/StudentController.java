package vn.iuh.fit.courseregistermanagementbe.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.iuh.fit.courseregistermanagementbe.dto.StudentDTO;
import vn.iuh.fit.courseregistermanagementbe.models.Department;
import vn.iuh.fit.courseregistermanagementbe.models.ResponseObject;
import vn.iuh.fit.courseregistermanagementbe.models.Student;
import vn.iuh.fit.courseregistermanagementbe.services.IDepartmentService;
import vn.iuh.fit.courseregistermanagementbe.services.IStudentService;
import vn.iuh.fit.courseregistermanagementbe.utils.Handler;

import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping(path = "/api/v1/students")
public class StudentController {

    @Autowired
    private IStudentService studentService;

    @Autowired
    private IDepartmentService departmentService;

    @PostMapping("/login")
    public ResponseEntity<ResponseObject> login(@RequestBody Object obj) {
        try {
            LinkedHashMap<String, String> map = (LinkedHashMap<String, String>) obj;
            Student foundStudent = studentService.findByUsername(map.get("username"));
            if(foundStudent != null) {
                String decodedPassword = Handler.decodePassword(foundStudent.getPassword());
                if(!decodedPassword.equals(map.get("password"))) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                            new ResponseObject("failed", "Password incorrect", null)
                    );
                } else {
                    StudentDTO studentDTO = Handler.convertStudentToStudentDTO(foundStudent);
                    return ResponseEntity.status(HttpStatus.OK).body(
                            new ResponseObject("success", "Login successfully", studentDTO)
                    );
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject("failed", "User name doesn't exist", null)
                );
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("failed", "Login failed", null)
            );
        }
    }

    @GetMapping
    public ResponseEntity<ResponseObject> findAll() {
        try {
            List<StudentDTO> studentDTOList = studentService.findAll().stream().map(Handler::convertStudentToStudentDTO).toList();
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("success", "Get all students successfully", studentDTOList)
            );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("failed", "Get all students failed", null)
            );
        }
    }

    @PostMapping
    public ResponseEntity<ResponseObject> save(@RequestBody Object obj) {
        try {
            LinkedHashMap<String, String> map = (LinkedHashMap<String, String>) obj;

            Student student = new Student();
            // check unique id
            do {
                student.setId(Handler.generateRandomCode());
            } while(studentService.existsById(student.getId()));

            student.setUsername(student.getId());
            String encodedPassword = Handler.encodePassword(student.getId());
            student.setPassword(encodedPassword);
            student.setFullName(map.get("fullName"));
            student.setGender(Handler.valueOfEGender(map.get("gender")));
            // check >= 18
            LocalDate dob = LocalDate.parse(map.get("dob"));
            if(dob.plusYears(18).isAfter(LocalDate.now())) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(
                        new ResponseObject("failed", "Date of birth must be greater than 18 years old", null)
                );
            }
            student.setDateOfBirth(dob);
            // check email unique
            if(studentService.existsByEmail(map.get("email"))) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(
                        new ResponseObject("failed", "Email already exists", null)
                );
            }
            student.setEmail(map.get("email"));
            // check phone unique
            if(studentService.existsByPhone(map.get("phone"))) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(
                        new ResponseObject("failed", "Phone already exists", null)
                );
            }
            student.setPhone(map.get("phone"));
            student.setDepartment(departmentService.findById(map.get("department")));
            boolean result = studentService.save(student);
            if(result) {
                StudentDTO studentDTO = Handler.convertStudentToStudentDTO(student);
                return ResponseEntity.status(HttpStatus.CREATED).body(
                        new ResponseObject("success", "Add successfully", studentDTO)
                );
            } else {
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(
                        new ResponseObject("failed", "Add failed", null)
                );
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("failed", "Add failed", null)
            );
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject> update(@PathVariable String id, @RequestBody Object obj) {
        try {
            LinkedHashMap<String, String> map = (LinkedHashMap<String, String>) obj;

            Student foundStudent = studentService.findById(id);
            if(foundStudent == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject("failed", "User not found", null)
                );
            }

            foundStudent.setFullName(map.get("fullName"));
            // check >= 18
            LocalDate dob = LocalDate.parse(map.get("dob"));
            if(dob.plusYears(18).isAfter(LocalDate.now())) {
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(
                        new ResponseObject("failed", "Date of birth must be greater than 18 years old", null)
                );
            }
            foundStudent.setDateOfBirth(dob);
            foundStudent.setEmail(map.get("email"));
            foundStudent.setPhone(map.get("phone"));
            foundStudent.setGender(Handler.valueOfEGender(map.get("gender")));
            if(map.get("department") != null) {
                foundStudent.setDepartment(departmentService.findById(map.get("department")));
            }

            if(studentService.save(foundStudent)) {
                StudentDTO studentDTO = Handler.convertStudentToStudentDTO(foundStudent);
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("success", "Update successfully", studentDTO)
                );
            } else {
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(
                        new ResponseObject("failed", "Update failed", null)
                );
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("failed", "Update failed", null)
            );
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject> delete(@PathVariable String id) {
        try {
            studentService.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("success", "Delete successfully", null)
            );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("failed", "Delete failed", null)
            );
        }

    }

    @PutMapping("/{id}/change-password")
    public ResponseEntity<ResponseObject> changePassword(@PathVariable String id, @RequestBody String oldPassword, @RequestBody String newPassword) {
        try {
            Student foundStudent = studentService.findById(id);
            if(foundStudent != null) {
                String decodedPassword = Handler.decodePassword(foundStudent.getPassword());
                if(!decodedPassword.equals(oldPassword)) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                            new ResponseObject("failed", "Old password incorrect", null)
                    );
                }
                String encodedNewPassword = Handler.encodePassword(newPassword);
                foundStudent.setPassword(encodedNewPassword);
                if(studentService.save(foundStudent)) {
                    return ResponseEntity.status(HttpStatus.OK).body(
                            new ResponseObject("success", "Change password successfully", null)
                    );
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                            new ResponseObject("failed", "Change password failed", null)
                    );
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject("failed", "User name doesn't exist", null)
                );
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("failed", "Change password failed", null)
            );
        }
    }
}
