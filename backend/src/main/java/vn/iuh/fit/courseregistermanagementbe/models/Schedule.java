package vn.iuh.fit.courseregistermanagementbe.models;

import jakarta.persistence.*;
import lombok.*;
import vn.iuh.fit.courseregistermanagementbe.enums.ERoom;
import vn.iuh.fit.courseregistermanagementbe.enums.ESchedule;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "schedules")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode(of = "id")
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Enumerated(EnumType.STRING)
    private ESchedule name;
    private LocalDate time;
    @Enumerated(EnumType.STRING)
    private ERoom room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "class_id")
    private Clazz clazz;
}
