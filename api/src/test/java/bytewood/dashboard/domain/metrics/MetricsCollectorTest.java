package bytewood.dashboard.domain.metrics;

import bytewood.dashboard.domain.entity.Transaction;
import bytewood.dashboard.domain.model.Metric;
import bytewood.dashboard.spring.MetricsConfiguration;
import bytewood.dashboard.spring.TransactionData;
import lombok.extern.slf4j.Slf4j;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static bytewood.dashboard.domain.entity.Status.FAILED;
import static bytewood.dashboard.domain.entity.Status.PARTIAL;
import static bytewood.dashboard.domain.entity.Status.REVIEW;
import static bytewood.dashboard.domain.entity.Status.SUCCESSFUL;
import static java.time.ZoneOffset.UTC;
import static java.time.ZonedDateTime.of;
import static org.assertj.core.api.Assertions.assertThat;

@Slf4j
@RunWith(SpringRunner.class)
@ContextConfiguration(classes = {MetricsConfiguration.class})
@DataJpaTest
@Rollback
@EnableAutoConfiguration
@EntityScan(basePackageClasses = {Transaction.class})
public class MetricsCollectorTest implements TransactionData {

    @Autowired
    private EntityManager em;

    @Autowired
    private MetricsCollector testObject;

    @Before
    public void setUp() {
        long id = 0;
        em.persist(payment(id++, of(2018, 1, 1, 8, 0, 0, 0, UTC).toInstant(), PARTIAL.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1, 8, 0, 0, 0, UTC).toInstant(), PARTIAL.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1, 8, 0, 0, 0, UTC).toInstant(), FAILED.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1, 8, 0, 0, 0, UTC).toInstant(), FAILED.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1, 8, 0, 0, 0, UTC).toInstant(), FAILED.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1, 8, 0, 0, 0, UTC).toInstant(), SUCCESSFUL.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1, 8, 0, 0, 0, UTC).toInstant(), SUCCESSFUL.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1, 8, 0, 0, 0, UTC).toInstant(), SUCCESSFUL.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1, 8, 0, 0, 0, UTC).toInstant(), SUCCESSFUL.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1, 8, 0, 0, 0, UTC).toInstant(), SUCCESSFUL.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1, 8, 0, 0, 0, UTC).toInstant(), REVIEW.name(), value()));

        em.persist(payment(id++, of(2018, 1, 1, 13, 0, 0, 0, UTC).toInstant(), PARTIAL.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1, 13, 0, 0, 0, UTC).toInstant(), PARTIAL.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1, 13, 0, 0, 0, UTC).toInstant(), FAILED.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1, 13, 0, 0, 0, UTC).toInstant(), FAILED.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1, 13, 0, 0, 0, UTC).toInstant(), FAILED.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1, 13, 0, 0, 0, UTC).toInstant(), SUCCESSFUL.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1, 13, 0, 0, 0, UTC).toInstant(), SUCCESSFUL.name(), value()));
        em.persist(payment(id++, of(2018, 2, 1, 13, 0, 0, 0, UTC).toInstant(), SUCCESSFUL.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1, 13, 0, 0, 0, UTC).toInstant(), SUCCESSFUL.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1, 13, 0, 0, 0, UTC).toInstant(), SUCCESSFUL.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1, 13, 0, 0, 0, UTC).toInstant(), REVIEW.name(), value()));

        em.persist(payment(id++, of(2017, 1, 1, 13, 0, 0, 0, UTC).toInstant(), SUCCESSFUL.name(), value()));
    }

    private BigDecimal value() {
        return BigDecimal.valueOf(
                random.doubles(100.0000, 100000.0000).findAny().orElse(0.00));
    }

    @Test
    public void fetch_daily() {
        final ZonedDateTime from = of(2018, 1, 1, 0, 0, 0, 0, UTC);

        List<Metric> o = testObject.fetch(from, ChronoUnit.HOURS);

        o.forEach(t -> log.debug("{}", t));

        assertThat(o).hasSize(8);
    }

    @Test
    public void fetch_monthly() {
        final ZonedDateTime from = of(2018, 1, 5, 0, 0, 0, 0, UTC);

        List<Metric> o = testObject.fetch(from, ChronoUnit.DAYS);

        assertThat(o).hasSize(4);
    }

    @Test
    public void fetch_yearly() {
        final ZonedDateTime from = of(2018, 5, 1, 0, 0, 0, 0, UTC);

        List<Metric> o = testObject.fetch(from, ChronoUnit.MONTHS);

        assertThat(o).hasSize(5);
    }

    @Test
    public void fetch_alltime() {
        final ZonedDateTime from = of(2018, 1, 1, 0, 0, 0, 0, UTC);

        List<Metric> o = testObject.fetch(from, ChronoUnit.FOREVER);

        o.forEach(t -> log.debug("{}", t));

        assertThat(o).hasSize(4);
    }
}
