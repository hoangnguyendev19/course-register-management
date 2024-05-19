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
public class ScheduleDTO implements Serializable {
    private int id;
    private String name;
    private String time;
    private String room;
    private String clazz;
}
