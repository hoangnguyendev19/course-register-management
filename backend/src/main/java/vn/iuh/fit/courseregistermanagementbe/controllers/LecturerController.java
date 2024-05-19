package vn.iuh.fit.courseregistermanagementbe.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.iuh.fit.courseregistermanagementbe.dto.LecturerDTO;
import vn.iuh.fit.courseregistermanagementbe.models.Department;
import vn.iuh.fit.courseregistermanagementbe.models.Lecturer;
import vn.iuh.fit.courseregistermanagementbe.models.ResponseObject;
import vn.iuh.fit.courseregistermanagementbe.services.IDepartmentService;
import vn.iuh.fit.courseregistermanagementbe.services.ILecturerService;
import vn.iuh.fit.courseregistermanagementbe.utils.Handler;

import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping(path = "/api/v1/lecturers")
public class LecturerController {

    @Autowired
    private ILecturerService lecturerService;

    @Autowired
    private IDepartmentService departmentService;

    @PostMapping("/login")
    public ResponseEntity<ResponseObject> login(@RequestBody Object obj) {
        try {
            LinkedHashMap<String, String> map = (LinkedHashMap<String, String>) obj;
            Lecturer foundLecturer = lecturerService.findByUsername(map.get("username"));
            if(foundLecturer != null) {
                String decodedPassword = Handler.decodePassword(foundLecturer.getPassword());
                if(!decodedPassword.equals(map.get("password"))) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                            new ResponseObject("failed", "Password incorrect", null)
                    );
                } else {
                    LecturerDTO lecturerDTO = Handler.convertLecturerToLecturerDTO(foundLecturer);
                    return ResponseEntity.status(HttpStatus.OK).body(
                            new ResponseObject("success", "Login successfully", lecturerDTO)
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
            List<LecturerDTO> lecturerDTOList = lecturerService.findAll().stream().map(Handler::convertLecturerToLecturerDTO).toList();

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("success", "Get all users successfully", lecturerDTOList)
            );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("failed", "Get all users failed", null)
            );
        }
    }

    @PostMapping
    public ResponseEntity<ResponseObject> save(@RequestBody Object obj) {
        try {
            LinkedHashMap<String, String> map = (LinkedHashMap<String, String>) obj;

            Lecturer lecturer = new Lecturer();
            // check unique id
            do {
                lecturer.setId(Handler.generateRandomCode());
            } while(lecturerService.existsById(lecturer.getId()));

            lecturer.setUsername(lecturer.getId());
            String encodedPassword = Handler.encodePassword(lecturer.getId());
            lecturer.setPassword(encodedPassword);
            lecturer.setFullName(map.get("fullName"));
            lecturer.setGender(Handler.valueOfEGender(map.get("gender")));
            // check >= 18
            LocalDate dob = LocalDate.parse(map.get("dob"));
            if(dob.plusYears(18).isAfter(LocalDate.now())) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(
                        new ResponseObject("failed", "Date of birth must be greater than 18 years old", null)
                );
            }
            lecturer.setDateOfBirth(dob);
            // check email unique
            if(lecturerService.existsByEmail(map.get("email"))) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(
                        new ResponseObject("failed", "Email already exists", null)
                );
            }
            lecturer.setEmail(map.get("email"));
            // check phone unique
            if(lecturerService.existsByPhone(map.get("phone"))) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(
                        new ResponseObject("failed", "Phone already exists", null)
                );
            }
            lecturer.setPhone(map.get("phone"));
            lecturer.setDepartment(departmentService.findById(map.get("department")));
            boolean result = lecturerService.save(lecturer);
            if(result) {
                LecturerDTO lecturerDTO = Handler.convertLecturerToLecturerDTO(lecturer);
                return ResponseEntity.status(HttpStatus.CREATED).body(
                        new ResponseObject("success", "Add successfully", lecturerDTO)
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

            Lecturer foundLecturer = lecturerService.findById(id);
            if(foundLecturer == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject("failed", "User not found", null)
                );
            }

            foundLecturer.setFullName(map.get("fullName"));
            // check >= 18
            LocalDate dob = LocalDate.parse(map.get("dob"));
            if(dob.plusYears(18).isAfter(LocalDate.now())) {
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(
                        new ResponseObject("failed", "Date of birth must be greater than 18 years old", null)
                );
            }
            foundLecturer.setDateOfBirth(dob);
            foundLecturer.setEmail(map.get("email"));
            foundLecturer.setPhone(map.get("phone"));
            foundLecturer.setGender(Handler.valueOfEGender(map.get("gender")));
            foundLecturer.setDepartment(departmentService.findById(map.get("department")));

            if(lecturerService.save(foundLecturer)) {
                LecturerDTO lecturerDTO = Handler.convertLecturerToLecturerDTO(foundLecturer);
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("success", "Update successfully", lecturerDTO)
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
            lecturerService.deleteById(id);
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
            Lecturer foundLecturer = lecturerService.findById(id);
            if(foundLecturer != null) {
                String decodedPassword = Handler.decodePassword(foundLecturer.getPassword());
                if(!decodedPassword.equals(oldPassword)) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                            new ResponseObject("failed", "Old password incorrect", null)
                    );
                }
                String encodedNewPassword = Handler.encodePassword(newPassword);
                foundLecturer.setPassword(encodedNewPassword);
                if(lecturerService.save(foundLecturer)) {
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
