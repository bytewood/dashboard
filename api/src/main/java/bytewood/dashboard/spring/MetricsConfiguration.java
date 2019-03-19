package bytewood.dashboard.spring;

import bytewood.dashboard.domain.metrics.MetricsCollector;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManager;

@Configuration
public class MetricsConfiguration {

    @Bean
    public MetricsCollector paymentMetrics(final EntityManager em) {
        return new MetricsCollector(em);
    }
}
