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
public class LecturerDTO implements Serializable {
    private String id;
    private String fullName;
    private String gender;
    private String dateOfBirth;
    private String email;
    private String phone;
    private String department;
    private boolean admin;
}
