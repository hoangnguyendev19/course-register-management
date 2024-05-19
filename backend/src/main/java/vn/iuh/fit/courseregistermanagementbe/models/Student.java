package vn.iuh.fit.courseregistermanagementbe.models;

import jakarta.persistence.*;
import lombok.*;
import vn.iuh.fit.courseregistermanagementbe.enums.EGender;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "students")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode(of = "id")
public class Student {
    @Id
    private String id;
    private String username;
    private String password;
    @Column(name = "full_name", columnDefinition = "nvarchar(255)")
    private String fullName;
    @Enumerated(EnumType.STRING)
    private EGender gender;
    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;
    private String email;
    private String phone;

    @OneToMany(mappedBy = "student")
    private List<Enrollment> enrollments;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;
}
