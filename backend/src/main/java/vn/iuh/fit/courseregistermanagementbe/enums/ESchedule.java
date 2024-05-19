package vn.iuh.fit.courseregistermanagementbe.enums;

public enum ESchedule {
    MORNING("morning"), AFTERNOON("afternoon"), EVENING("evening");

    private final String value;

    ESchedule(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
