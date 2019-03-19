package bytewood.dashboard.domain.model;

public enum RequestType {
    CREDIT("urn:iso:std:iso:20022:tech:xsd:pain.001.001.08"),
    DEBIT("urn:iso:std:iso:20022:tech:xsd:pain.008.001.07"),
    MANDATE("urn:iso:std:iso:20022:tech:xsd:pain.009.001.05");

    private String namespace;

    RequestType(final String namespace) {
        this.namespace = namespace;
    }

    public String getNamespace() {
        return this.namespace;
    }
}
