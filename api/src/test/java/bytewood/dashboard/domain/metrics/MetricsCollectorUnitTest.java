package bytewood.dashboard.domain.metrics;

import bytewood.dashboard.domain.entity.QTransaction;
import com.querydsl.core.types.Operation;
import com.querydsl.core.types.dsl.NumberExpression;
import org.junit.Before;
import org.junit.Test;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;

import static java.time.ZonedDateTime.of;
import static org.assertj.core.api.Assertions.assertThat;

public class MetricsCollectorUnitTest {

    private MetricsCollector testObject;
    private ZonedDateTime dateTime;

    @Before
    public void setUp() {
        testObject = new MetricsCollector(null);
        dateTime = of(2018, 4, 7, 11, 33, 46, 123456789, ZoneId.systemDefault());
    }

    @Test
    public void truncateDate_for_alltime() {
        final ZonedDateTime actual = testObject.after(dateTime, ChronoUnit.FOREVER);
        assertThat(actual).isEqualTo(of(2018, 4, 7, 0, 0, 0, 0, ZoneId.systemDefault()));
    }

    @Test
    public void truncateDate_for_months() {
        final ZonedDateTime actual = testObject.after(dateTime, ChronoUnit.MONTHS);
        assertThat(actual).isEqualTo(of(2018, 1, 1, 0, 0, 0, 0, ZoneId.systemDefault()));
    }

    @Test
    public void truncateDate_for_days() {
        final ZonedDateTime actual = testObject.after(dateTime, ChronoUnit.DAYS);
        assertThat(actual).isEqualTo(of(2018, 4, 1, 0, 0, 0, 0, ZoneId.systemDefault()));

    }

    @Test
    public void truncateDate_for_hours() {
        final ZonedDateTime actual = testObject.after(dateTime, ChronoUnit.HOURS);
        assertThat(actual).isEqualTo(of(2018, 4, 7, 0, 0, 0, 0, ZoneId.systemDefault()));
    }

    @Test
    public void chronoInterval_for_alltime() {
        final NumberExpression<? extends Number> actual = testObject.chronoInterval(QTransaction.transaction, ChronoUnit.FOREVER);
        assertThat(actual.toString()).isEqualTo("0");
    }

    @Test
    public void chronoInterval_for_months() {
        final NumberExpression<? extends Number> actual = testObject.chronoInterval(QTransaction.transaction, ChronoUnit.MONTHS);
        assertThat(((Operation) actual).getOperator().name()).isEqualTo("MONTH");
    }

    @Test
    public void chronoInterval_for_days() {
        final NumberExpression<? extends Number> actual = testObject.chronoInterval(QTransaction.transaction, ChronoUnit.DAYS);
        assertThat(((Operation) actual).getOperator().name()).isEqualTo("DAY_OF_MONTH");
    }

    @Test
    public void chronoInterval_for_hours() {
        final NumberExpression<? extends Number> actual = testObject.chronoInterval(QTransaction.transaction, ChronoUnit.HOURS);
        assertThat(((Operation) actual).getOperator().name()).isEqualTo("HOUR");
    }

    @Test
    public void before_for_months() {
        final ZonedDateTime actual = testObject.before(dateTime, ChronoUnit.MONTHS);
        assertThat(actual.getYear()).isEqualTo(2019);

    }

    @Test
    public void before_for_days() {
        final ZonedDateTime actual = testObject.before(dateTime, ChronoUnit.DAYS);
        assertThat(actual.getMonth().getValue()).isEqualTo(5);

    }

    @Test
    public void before_for_hours() {
        final ZonedDateTime actual = testObject.before(dateTime, ChronoUnit.HOURS);
        assertThat(actual.getDayOfMonth()).isEqualTo(8);
    }
}
