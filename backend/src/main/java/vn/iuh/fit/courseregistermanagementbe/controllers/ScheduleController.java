package vn.iuh.fit.courseregistermanagementbe.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.iuh.fit.courseregistermanagementbe.dto.ScheduleDTO;
import vn.iuh.fit.courseregistermanagementbe.models.Clazz;
import vn.iuh.fit.courseregistermanagementbe.models.ResponseObject;
import vn.iuh.fit.courseregistermanagementbe.models.Schedule;
import vn.iuh.fit.courseregistermanagementbe.services.IClazzService;
import vn.iuh.fit.courseregistermanagementbe.services.IScheduleService;
import vn.iuh.fit.courseregistermanagementbe.utils.Handler;

import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping(path = "/api/v1/schedules")
public class ScheduleController {

    @Autowired
    private IScheduleService scheduleService;

    @Autowired
    private IClazzService clazzService;

    @GetMapping
    public ResponseEntity<ResponseObject> findAll(@RequestParam(required = false) String clazz) {
        try {
            List<ScheduleDTO> scheduleDTOList = null;
            if (clazz != null) {
                scheduleDTOList = scheduleService.findAllByClazzId(clazz).stream().map(Handler::convertScheduleToScheduleDTO).toList();
            } else {
                scheduleDTOList = scheduleService.findAll().stream().map(Handler::convertScheduleToScheduleDTO).toList();
            }
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("success", "Get all schedules successfully", scheduleDTOList)
            );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("error", "Get all schedules failed", null)
            );
        }
    }

    @GetMapping("/student")
    public ResponseEntity<ResponseObject> findAllByStudentId(@RequestParam String studentId) {
        try {
            List<ScheduleDTO> scheduleDTOList = scheduleService.findAllByStudentId(studentId).stream().map(Handler::convertScheduleToScheduleDTO).toList();
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("success", "Get all schedules successfully", scheduleDTOList)
            );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("error", "Get all schedules failed", null)
            );
        }
    }

    @GetMapping("/lecturer")
    public ResponseEntity<ResponseObject> findAllByLecturerId(@RequestParam String lecturerId) {
        try {
            List<ScheduleDTO> scheduleDTOList = scheduleService.findAllByLecturerId(lecturerId).stream().map(Handler::convertScheduleToScheduleDTO).toList();
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("success", "Get all schedules successfully", scheduleDTOList)
            );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("error", "Get all schedules failed", null)
            );
        }
    }

    @PostMapping
    public ResponseEntity<ResponseObject> save(@RequestBody Object obj) {
        try {
            LinkedHashMap<String, Object> map = (LinkedHashMap<String, Object>) obj;
            Schedule schedule = new Schedule();
            schedule.setName(Handler.valueOfESchedule(map.get("name").toString()));
            schedule.setTime(LocalDate.parse(map.get("time").toString()));
            schedule.setRoom(Handler.valueOfERoom(map.get("room").toString()));
            Clazz clazz = clazzService.findById(map.get("clazz").toString());
            schedule.setClazz(clazz);
            if (scheduleService.save(schedule)) {
                ScheduleDTO scheduleDTO = Handler.convertScheduleToScheduleDTO(schedule);
                return ResponseEntity.status(HttpStatus.CREATED).body(
                        new ResponseObject("success", "Create schedule successfully", scheduleDTO)
                );
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("error", "Create schedule failed", null)
            );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("error", "Create schedule failed", null)
            );
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject> update(@PathVariable int id, @RequestBody Object obj) {
        try {
            LinkedHashMap<String, Object> map = (LinkedHashMap<String, Object>) obj;
            Schedule schedule = scheduleService.findById(id);
            schedule.setName(Handler.valueOfESchedule(map.get("name").toString()));
            schedule.setTime(LocalDate.parse(map.get("time").toString()));
            schedule.setRoom(Handler.valueOfERoom(map.get("room").toString()));
            Clazz clazz = clazzService.findById(map.get("clazz").toString());
            schedule.setClazz(clazz);
            if (scheduleService.save(schedule)) {
                ScheduleDTO scheduleDTO = Handler.convertScheduleToScheduleDTO(schedule);
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("success", "Update schedule successfully", scheduleDTO)
                );
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("error", "Update schedule failed", null)
            );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("error", "Update schedule failed", null)
            );
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject> delete(@PathVariable int id) {
        try {
            Schedule schedule = scheduleService.findById(id);
            if (schedule == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject("error", "Schedule with id " + id + " not found", null)
                );
            }
            scheduleService.delete(id);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("success", "Delete schedule successfully", null)
            );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("error", "Delete schedule failed", null)
            );
        }
    }
}
