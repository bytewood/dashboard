package bytewood.dashboard.domain.model;

import bytewood.dashboard.domain.entity.Status;
import com.querydsl.core.annotations.QueryProjection;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.math.BigDecimal;

@Getter
@EqualsAndHashCode
@ToString
public class Metric {

    private final int interval;
    private final Status status;
    private final long count;
    private final BigDecimal sum;
    private final BigDecimal min;
    private final double avg;
    private final BigDecimal max;

    @QueryProjection
    public Metric(final int interval, final String status, final long count, final BigDecimal sum, final BigDecimal min, final double avg, final BigDecimal max) {
        this.interval = interval;
        this.status = Status.valueOf(status);
        this.count = count;
        this.sum = sum;
        this.min = min;
        this.avg = avg;
        this.max = max;
    }
}
