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
public class ClazzDTO implements Serializable {
    private String id;
    private String name;
    private int capacity;
    private int current;
    private String course;
    private String lecturer;
    private String type;
    private String theory;
    private String startDate;
    private String endDate;
    private String status;
}
