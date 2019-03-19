package bytewood.dashboard.spring;

import lombok.extern.slf4j.Slf4j;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import java.math.BigDecimal;

import static bytewood.dashboard.domain.entity.Status.FAILED;
import static bytewood.dashboard.domain.entity.Status.IN_PROGRESS;
import static bytewood.dashboard.domain.entity.Status.PARTIAL;
import static bytewood.dashboard.domain.entity.Status.REVIEW;
import static bytewood.dashboard.domain.entity.Status.SUCCESSFUL;
import static java.time.ZoneOffset.UTC;
import static java.time.ZonedDateTime.of;
import static java.time.format.DateTimeFormatter.ISO_ZONED_DATE_TIME;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@EnableAutoConfiguration
@AutoConfigureMockMvc
@Transactional
@Rollback
public class MetricsControllerTest implements TransactionData {

    @Autowired
    private MockMvc http;

    @Autowired
    private EntityManager em;

    @Before
    public void setUp() {
        long  id = 0;
        em.persist(payment(id++, of(2018, 1, 1,  8, 0, 0, 0, UTC).toInstant(),      PARTIAL.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1,  8, 0, 0, 0, UTC).toInstant(),      PARTIAL.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1,  8, 0, 0, 0, UTC).toInstant(),       FAILED.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1,  8, 0, 0, 0, UTC).toInstant(),       FAILED.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1,  8, 0, 0, 0, UTC).toInstant(),       FAILED.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1,  8, 0, 0, 0, UTC).toInstant(),  IN_PROGRESS.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1,  8, 0, 0, 0, UTC).toInstant(),   SUCCESSFUL.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1,  8, 0, 0, 0, UTC).toInstant(),   SUCCESSFUL.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1,  8, 0, 0, 0, UTC).toInstant(),   SUCCESSFUL.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1,  8, 0, 0, 0, UTC).toInstant(),   SUCCESSFUL.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1,  8, 0, 0, 0, UTC).toInstant(),   SUCCESSFUL.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1,  8, 0, 0, 0, UTC).toInstant(),       REVIEW.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1, 13, 0, 0, 0, UTC).toInstant(),     PARTIAL.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1, 13, 0, 0, 0, UTC).toInstant(),     PARTIAL.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1, 13, 0, 0, 0, UTC).toInstant(),      FAILED.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1, 13, 0, 0, 0, UTC).toInstant(),      FAILED.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1, 13, 0, 0, 0, UTC).toInstant(),      FAILED.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1, 13, 0, 0, 0, UTC).toInstant(), IN_PROGRESS.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1, 13, 0, 0, 0, UTC).toInstant(), IN_PROGRESS.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1, 13, 0, 0, 0, UTC).toInstant(),  SUCCESSFUL.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1, 13, 0, 0, 0, UTC).toInstant(),  SUCCESSFUL.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1, 13, 0, 0, 0, UTC).toInstant(),  SUCCESSFUL.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1, 13, 0, 0, 0, UTC).toInstant(),  SUCCESSFUL.name(), value()));
        em.persist(payment(id++, of(2018, 1, 1, 13, 0, 0, 0, UTC).toInstant(),      REVIEW.name(), value()));
    }

    private BigDecimal value() {
        return BigDecimal.valueOf(
                random.doubles(100.0000, 100000.0000).findAny().orElse(0.00));
    }

    @Test
    public void payment_by_date_range() throws Exception {
        final String after = ISO_ZONED_DATE_TIME.format(of(2018, 1, 1, 0, 0, 0, 0, UTC));

        final MvcResult o = http.perform(get("/payment/metrics/hourly")
                .header("Content-Type", "application/hal+json")
                .param("after", after)
                .param("chronounit", "HOURS"))
                .andReturn();

        log.debug(o.getResponse().getContentAsString());
    }
}
