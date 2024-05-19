package vn.iuh.fit.courseregistermanagementbe.enums;

public enum EGender {
    MALE("male"), FEMALE("female");

    private final String value;

    EGender(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
