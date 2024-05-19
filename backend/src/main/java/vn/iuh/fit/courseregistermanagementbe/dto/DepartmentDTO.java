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
public class DepartmentDTO implements Serializable {
    private String id;
    private String name;
}
