package vn.iuh.fit.courseregistermanagementbe.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "departments")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode(of = "id")
public class Department {
    @Id
    private String id;
    @Column(columnDefinition = "nvarchar(255)")
    private String name;

    @OneToMany(mappedBy = "department")
    private List<Student> users;
}
