package vn.iuh.fit.courseregistermanagementbe.models;

import jakarta.persistence.*;
import lombok.*;
import vn.iuh.fit.courseregistermanagementbe.enums.EGender;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "lecturers")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode(of = "id")
public class Lecturer {
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
    private boolean admin;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;

    @OneToMany(mappedBy = "lecturer")
    private List<Clazz> classes;
}
