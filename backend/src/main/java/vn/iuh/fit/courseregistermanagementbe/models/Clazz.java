package vn.iuh.fit.courseregistermanagementbe.models;

import jakarta.persistence.*;
import lombok.*;
import vn.iuh.fit.courseregistermanagementbe.enums.EStatus;
import vn.iuh.fit.courseregistermanagementbe.enums.EClassType;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "classes")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode(of = "id")
public class Clazz {
    @Id
    private String id;
    @Column(columnDefinition = "nvarchar(255)")
    private String name;
    private int capacity;
    private int current;
    @Enumerated(EnumType.STRING)
    private EClassType type;
    @Column(name = "start_date")
    private LocalDate startDate;
    @Column(name = "end_date")
    private LocalDate endDate;
    private String theory;
    @Enumerated(EnumType.STRING)
    private EStatus status;

    @OneToMany(mappedBy = "clazz", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Schedule> schedules;

    @OneToMany(mappedBy = "clazz", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Enrollment> enrollments;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecturer_id")
    private Lecturer lecturer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "semester_id")
    private Semester semester;
}
