package vn.iuh.fit.courseregistermanagementbe.models;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = {"clazz", "student"})
public class EnrollmentId implements Serializable {
    private Clazz clazz;
    private Student student;
}
