package vn.iuh.fit.courseregistermanagementbe.enums;

public enum ERoom {
    H201("H201"), H202("H202"), H301("H301"), H302("H302"), H401("H401"), H402("H402");

    private final String value;

    ERoom(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
