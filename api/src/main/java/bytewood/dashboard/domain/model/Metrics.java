package bytewood.dashboard.domain.model;

import lombok.Value;

import java.util.List;

@Value
public class Metrics {
    private MetricMetadata metadata;
    private List<Metric> metrics;
}
