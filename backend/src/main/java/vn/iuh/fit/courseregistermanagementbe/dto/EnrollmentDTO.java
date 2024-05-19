package vn.iuh.fit.courseregistermanagementbe.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class EnrollmentDTO implements Serializable {
    private String id;
    private String name;
    private String courseId;
    private String type;
    private String theory;
    private int credit;
    private String createdAt;
    private String status;
    private int semesterId;
}
