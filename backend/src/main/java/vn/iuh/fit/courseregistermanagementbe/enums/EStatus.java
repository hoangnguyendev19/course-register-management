package vn.iuh.fit.courseregistermanagementbe.enums;

public enum EStatus {
    OPEN("open"), CLOSE("close");

    private final String value;

    EStatus(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
