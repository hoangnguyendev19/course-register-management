package vn.iuh.fit.courseregistermanagementbe.utils;

import vn.iuh.fit.courseregistermanagementbe.dto.*;
import vn.iuh.fit.courseregistermanagementbe.enums.*;
import vn.iuh.fit.courseregistermanagementbe.models.*;

import java.util.Base64;

public class Handler {

    public static StudentDTO convertStudentToStudentDTO(Student student) {
        StudentDTO studentDTO = new StudentDTO();
        studentDTO.setId(student.getId());
        studentDTO.setFullName(student.getFullName());
        studentDTO.setGender(student.getGender().getValue());
        studentDTO.setDateOfBirth(student.getDateOfBirth().toString());
        studentDTO.setEmail(student.getEmail());
        studentDTO.setPhone(student.getPhone());
        studentDTO.setDepartment(student.getDepartment().getName());

        return studentDTO;
    }

    public static LecturerDTO convertLecturerToLecturerDTO(Lecturer lecturer) {
        LecturerDTO lecturerDTO = new LecturerDTO();
        lecturerDTO.setId(lecturer.getId());
        lecturerDTO.setFullName(lecturer.getFullName());
        lecturerDTO.setGender(lecturer.getGender().getValue());
        lecturerDTO.setDateOfBirth(lecturer.getDateOfBirth().toString());
        lecturerDTO.setEmail(lecturer.getEmail());
        lecturerDTO.setPhone(lecturer.getPhone());
        lecturerDTO.setDepartment(lecturer.getDepartment().getName());
        lecturerDTO.setAdmin(lecturer.isAdmin());

        return lecturerDTO;
    }

    public static DepartmentDTO convertDepartmentToDepartmentDTO(Department department) {
        DepartmentDTO departmentDTO = new DepartmentDTO();
        departmentDTO.setId(department.getId());
        departmentDTO.setName(department.getName());
        return departmentDTO;
    }

    public static SemesterDTO convertSemesterToSemesterDTO(Semester semester) {
        SemesterDTO semesterDTO = new SemesterDTO();
        semesterDTO.setId(semester.getId());
        semesterDTO.setName(semester.getName());
        return semesterDTO;
    }

    public static ClazzDTO convertClazzToClazzDTO(Clazz clazz) {
        ClazzDTO clazzDTO = new ClazzDTO();
        clazzDTO.setId(clazz.getId());
        clazzDTO.setName(clazz.getName());
        clazzDTO.setCapacity(clazz.getCapacity());
        clazzDTO.setCurrent(clazz.getCurrent());
        clazzDTO.setCourse(clazz.getCourse().getId());
        clazzDTO.setLecturer(clazz.getLecturer().getId());
        clazzDTO.setType(clazz.getType().getValue());
        clazzDTO.setTheory(clazz.getTheory());
        clazzDTO.setStartDate(clazz.getStartDate().toString());
        clazzDTO.setEndDate(clazz.getEndDate().toString());
        clazzDTO.setStatus(clazz.getStatus().getValue());
        return clazzDTO;
    }

    public static CourseDTO convertCourseToCourseDTO(Course course) {
        CourseDTO courseDTO = new CourseDTO();
        courseDTO.setId(course.getId());
        courseDTO.setName(course.getName());
        courseDTO.setDescription(course.getDescription());
        courseDTO.setCredit(course.getCredit());
        courseDTO.setPrerequisite(course.getPrerequisite());
        return courseDTO;
    }

    public static ScheduleDTO convertScheduleToScheduleDTO(Schedule schedule) {
        ScheduleDTO scheduleDTO = new ScheduleDTO();
        scheduleDTO.setId(schedule.getId());
        scheduleDTO.setName(schedule.getName().getValue());
        scheduleDTO.setTime(schedule.getTime().toString());
        scheduleDTO.setRoom(schedule.getRoom().getValue());
        scheduleDTO.setClazz(schedule.getClazz().getId());
        return scheduleDTO;
    }

    public static EnrollmentDTO convertEnrollmentToEnrollmentDTO(Enrollment enrollment) {
        EnrollmentDTO enrollmentDTO = new EnrollmentDTO();
        enrollmentDTO.setCourseId(enrollment.getClazz().getCourse().getId());
        enrollmentDTO.setId(enrollment.getClazz().getId());
        enrollmentDTO.setName(enrollment.getClazz().getName());
        enrollmentDTO.setType(enrollment.getClazz().getType().getValue());
        enrollmentDTO.setTheory(enrollment.getClazz().getTheory());
        enrollmentDTO.setCredit(enrollment.getClazz().getCourse().getCredit());
        enrollmentDTO.setCreatedAt(enrollment.getCreatedAt().toString());
        enrollmentDTO.setStatus(enrollment.getClazz().getStatus().getValue());
        enrollmentDTO.setSemesterId(enrollment.getClazz().getSemester().getId());

        return enrollmentDTO;
    }

    public static String encodePassword(String password) {
        return Base64.getEncoder().encodeToString(password.getBytes());
    }

    public static String decodePassword(String encodedPassword) {
        return new String(Base64.getDecoder().decode(encodedPassword));
    }

    public static String generateRandomCode() {
        // I want to generate a random number from 20000000 to 29999999. and unique in the database
        return String.valueOf((int) (Math.random() * 10000000) + 20000000);
    }

    public static EGender valueOfEGender(String gender) {
        for (EGender eGender : EGender.values()) {
            if (eGender.getValue().equals(gender)) {
                return eGender;
            }
        }
        return null;
    }

    public static EClassType valueOfEClassType(String type) {
        for (EClassType eClassType : EClassType.values()) {
            if (eClassType.getValue().equals(type)) {
                return eClassType;
            }
        }
        return null;
    }

    public static EStatus valueOfEStatus(String status) {
        for (EStatus eStatus : EStatus.values()) {
            if (eStatus.getValue().equals(status)) {
                return eStatus;
            }
        }
        return null;
    }

    public static ESchedule valueOfESchedule(String name) {
        for (ESchedule eSchedule : ESchedule.values()) {
            if (eSchedule.getValue().equals(name)) {
                return eSchedule;
            }
        }
        return null;
    }

    public static ERoom valueOfERoom(String name) {
        for (ERoom eRoom : ERoom.values()) {
            if (eRoom.getValue().equals(name)) {
                return eRoom;
            }
        }
        return null;
    }
}
