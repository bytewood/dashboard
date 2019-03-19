package bytewood.dashboard.domain.model;

import lombok.Value;

import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;

@Value
public class MetricMetadata {
    private ChronoUnit chronoUnit;
    private ZonedDateTime after;
}
