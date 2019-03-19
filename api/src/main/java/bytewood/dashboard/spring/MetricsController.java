package bytewood.dashboard.spring;

import bytewood.dashboard.domain.metrics.MetricsCollector;
import bytewood.dashboard.domain.model.Metric;
import bytewood.dashboard.domain.model.MetricMetadata;
import bytewood.dashboard.domain.model.Metrics;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static java.time.ZoneId.systemDefault;

@CrossOrigin
@RestController
@RequiredArgsConstructor
public class MetricsController {

    private final MetricsCollector metricsCollector;

    @GetMapping("/metrics")
    public Metrics hourlyPaymentMetrics(@RequestParam(name = "after") final Instant after, @RequestParam(name = "chronounit") final ChronoUnit chronoUnit) {
        final List<Metric> metrics = metricsCollector.fetch(after.atZone(systemDefault()), chronoUnit);
        final MetricMetadata metadata = new MetricMetadata(chronoUnit, after.atZone(systemDefault()));
        return new Metrics(metadata, metrics);
    }
}
