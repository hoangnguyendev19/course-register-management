package vn.iuh.fit.courseregistermanagementbe.enums;

public enum EClassType {
    THEORY("theory"), PRACTICE("practice");

    private final String value;

    EClassType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
