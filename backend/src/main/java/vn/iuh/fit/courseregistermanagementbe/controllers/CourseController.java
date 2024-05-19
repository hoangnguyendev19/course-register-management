package vn.iuh.fit.courseregistermanagementbe.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.iuh.fit.courseregistermanagementbe.dto.CourseDTO;
import vn.iuh.fit.courseregistermanagementbe.models.Course;
import vn.iuh.fit.courseregistermanagementbe.models.ResponseObject;
import vn.iuh.fit.courseregistermanagementbe.services.ICourseService;
import vn.iuh.fit.courseregistermanagementbe.utils.Handler;

import java.util.LinkedHashMap;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping(path = "/api/v1/courses")
public class CourseController {

    @Autowired
    private ICourseService courseService;

    @GetMapping
    public ResponseEntity<ResponseObject> findAll() {
        try {
            List<CourseDTO> courseDTOList = courseService.findAll().stream().map(Handler::convertCourseToCourseDTO).toList();
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("success", "Get all courses successfully", courseDTOList)
            );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("error", "Get all courses failed", null)
            );
        }
    }

    @PostMapping
    public ResponseEntity<ResponseObject> save(@RequestBody Object obj) {
        try {
            LinkedHashMap<String, String> map = (LinkedHashMap<String, String>) obj;
            Course course = new Course();
            do {
                course.setId(Handler.generateRandomCode());
            } while (courseService.existsById(course.getId()));

            course.setName(map.get("name"));
            course.setDescription(map.get("description"));
            course.setCredit(Integer.parseInt(map.get("credit")));
            course.setPrerequisite(map.get("prerequisite"));
            if (courseService.save(course)) {
                CourseDTO courseDTO = Handler.convertCourseToCourseDTO(course);
                return ResponseEntity.status(HttpStatus.CREATED).body(
                        new ResponseObject("success", "Create course successfully", courseDTO)
                );
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("error", "Create course failed", null)
            );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("error", "Create course failed", null)
            );
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject> update(@PathVariable String id, @RequestBody Object obj) {
        try {
            LinkedHashMap<String, Object> map = (LinkedHashMap<String, Object>) obj;
            Course course = courseService.findById(id);
            if (course == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject("error", "Course with id " + id + " not found", null)
                );
            }

            course.setName(map.get("name").toString());
            course.setDescription(map.get("description").toString());
            course.setCredit((int) map.get("credit"));
            course.setPrerequisite(map.get("prerequisite").toString());
            if (courseService.save(course)) {
                CourseDTO courseDTO = Handler.convertCourseToCourseDTO(course);
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("success", "Update course successfully", courseDTO)
                );
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("error", "Update course failed", null)
            );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("error", "Update course failed", null)
            );
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject> delete(@PathVariable String id) {
        try {
            Course course = courseService.findById(id);
            if (course == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject("error", "Course with id " + id + " not found", null)
                );
            }
            courseService.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("success", "Delete course successfully", null)
            );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("error", "Delete course failed", null)
            );
        }
    }
}
