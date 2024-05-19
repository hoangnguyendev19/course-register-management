package vn.iuh.fit.courseregistermanagementbe.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;
import vn.iuh.fit.courseregistermanagementbe.dto.ClazzDTO;
import vn.iuh.fit.courseregistermanagementbe.enums.EStatus;
import vn.iuh.fit.courseregistermanagementbe.models.Clazz;
import vn.iuh.fit.courseregistermanagementbe.models.Enrollment;
import vn.iuh.fit.courseregistermanagementbe.models.ResponseObject;
import vn.iuh.fit.courseregistermanagementbe.models.Student;
import vn.iuh.fit.courseregistermanagementbe.services.IClazzService;
import vn.iuh.fit.courseregistermanagementbe.services.ICourseService;
import vn.iuh.fit.courseregistermanagementbe.services.ILecturerService;
import vn.iuh.fit.courseregistermanagementbe.services.ISemesterService;
import vn.iuh.fit.courseregistermanagementbe.utils.Handler;

import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping(path = "/api/v1/classes")
public class ClazzController {

    @Autowired
    private IClazzService clazzService;

    @Autowired
    private ISemesterService semesterService;

    @Autowired
    private ICourseService courseService;

    @Autowired
    private ILecturerService lecturerService;

    @Autowired
    private JavaMailSender mailSender;

    @GetMapping
    public ResponseEntity<ResponseObject> findAll(@RequestParam int semester, @RequestParam(required = false) String type
            , @RequestParam(required = false) String course) {
        try {
            List<ClazzDTO> clazzDTOList = null;
            if(type == null && course != null) {
                clazzDTOList = clazzService.findAllBySemesterIdAndCourseId(semester, course).stream().map(Handler::convertClazzToClazzDTO).toList();
            } else if(type != null && course == null) {
                clazzDTOList = clazzService.findAllBySemesterIdAndType(semester, Handler.valueOfEClassType(type)).stream().map(Handler::convertClazzToClazzDTO).toList();
            } else {
                clazzDTOList = clazzService.findAllBySemesterId(semester).stream().map(Handler::convertClazzToClazzDTO).toList();
            }

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("success", "Get all users successfully", clazzDTOList)
            );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("error", "Get all users failed", null)
            );
        }
    }

    @PostMapping
    public ResponseEntity<ResponseObject> save(@RequestBody Object obj) {
        try {
            LinkedHashMap<String, Object> map = (LinkedHashMap<String, Object>) obj;
            Clazz clazz = new Clazz();

            do {
                clazz.setId(Handler.generateRandomCode());
            } while (clazzService.existsById(clazz.getId()));

            clazz.setName(map.get("name").toString());
            clazz.setCapacity(Integer.parseInt(map.get("capacity").toString()));
            clazz.setCurrent(0);
            clazz.setType(Handler.valueOfEClassType(map.get("type").toString()));
            clazz.setTheory(map.get("theory").toString());
            clazz.setStartDate(LocalDate.parse(map.get("startDate").toString()));
            clazz.setEndDate(LocalDate.parse(map.get("endDate").toString()));
            clazz.setStatus(EStatus.OPEN);
            clazz.setSemester(semesterService.findById((int) map.get("semester")));
            clazz.setCourse(courseService.findById(map.get("course").toString()));
            clazz.setLecturer(lecturerService.findById(map.get("lecturer").toString()));

            if (clazzService.save(clazz)) {
                return ResponseEntity.status(HttpStatus.CREATED).body(
                        new ResponseObject("success", "Create class successfully", Handler.convertClazzToClazzDTO(clazz))
                );
            }

            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(
                    new ResponseObject("error", "Create class failed", null)
            );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("error", "Create class failed", null)
            );
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject> update(@PathVariable String id, @RequestBody Object obj) {
        try {
            LinkedHashMap<String, Object> map = (LinkedHashMap<String, Object>) obj;
            Clazz clazz = clazzService.findById(id);

            clazz.setName(map.get("name").toString());
            clazz.setCapacity(Integer.parseInt(map.get("capacity").toString()));
            clazz.setType(Handler.valueOfEClassType(map.get("type").toString()));
            clazz.setTheory(map.get("theory").toString());
            clazz.setStartDate(LocalDate.parse(map.get("startDate").toString()));
            clazz.setEndDate(LocalDate.parse(map.get("endDate").toString()));
            clazz.setStatus(Handler.valueOfEStatus(map.get("status").toString()));
            clazz.setCourse(courseService.findById(map.get("course").toString()));
            clazz.setLecturer(lecturerService.findById(map.get("lecturer").toString()));

            if (clazzService.save(clazz)) {
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("success", "Update class successfully", Handler.convertClazzToClazzDTO(clazz))
                );
            }

            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(
                    new ResponseObject("error", "Update class failed", null)
            );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("error", "Update class failed", null)
            );
        }
    }

    @PutMapping("/{id}/close")
    public ResponseEntity<ResponseObject> close(@PathVariable String id) {
        try {
            Clazz clazz = clazzService.findById(id);
            clazz.setStatus(EStatus.CLOSE);

            if (clazzService.save(clazz)) {
                List<Student> students = clazz.getEnrollments().stream().map(Enrollment::getStudent).toList();
                System.out.println(students);
                for(Student student : students) {
                    // send email
                    SimpleMailMessage mailMessage = new SimpleMailMessage();
                    mailMessage.setFrom("chrisnguuyen193@gmail.com");
                    mailMessage.setTo(student.getEmail());
                    mailMessage.setSubject("Thông báo đăng ký học phần");
                    mailMessage.setText("Lớp học phần "+clazz.getId()+" với môn học "+clazz.getCourse().getName()+" đã được chấp nhận. Vui lòng đóng học phí trước thời hạn yêu cầu.");
                    mailSender.send(mailMessage);
                }

                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("success", "Close class successfully", Handler.convertClazzToClazzDTO(clazz))
                );
            }

            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(
                    new ResponseObject("error", "Close class failed", null)
            );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("error", "Close class failed", null)
            );
        }
    }

    @PutMapping("/{id}/open")
    public ResponseEntity<ResponseObject> open(@PathVariable String id) {
        try {
            Clazz clazz = clazzService.findById(id);
            clazz.setStatus(EStatus.OPEN);

            if(clazzService.save(clazz)) {
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("success", "Open class successfully", Handler.convertClazzToClazzDTO(clazz))
                );
            }

            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(
                    new ResponseObject("error", "Open class failed", null)
            );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("error", "Open class failed", null)
            );
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject> delete(@PathVariable String id) {
        try {
            Clazz clazz = clazzService.findById(id);
            List<Student> students = clazz.getEnrollments().stream().map(Enrollment::getStudent).toList();
            System.out.println(students);
            for(Student student : students) {
                // send email
                SimpleMailMessage mailMessage = new SimpleMailMessage();
                mailMessage.setFrom("chrisnguuyen193@gmail.com");
                mailMessage.setTo(student.getEmail());
                mailMessage.setSubject("Thông báo đăng ký học phần");
                mailMessage.setText("Lớp học phần "+clazz.getId()+" với môn học "+clazz.getCourse().getName()+" đã bị huỷ bỏ. Lý do: Số lượng đăng ký quá ít.");
                mailSender.send(mailMessage);
            }

            clazzService.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("success", "Delete class successfully", null)
            );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("error", "Delete class failed", null)
            );
        }
    }
}
