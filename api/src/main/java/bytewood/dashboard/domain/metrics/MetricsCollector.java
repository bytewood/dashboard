package bytewood.dashboard.domain.metrics;

import bytewood.dashboard.domain.entity.QTransaction;
import bytewood.dashboard.domain.entity.Transaction;
import bytewood.dashboard.domain.model.Metric;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.impl.JPAQuery;
import lombok.RequiredArgsConstructor;

import javax.persistence.EntityManager;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoField;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static java.time.temporal.ChronoUnit.FOREVER;

@RequiredArgsConstructor
public class MetricsCollector {

    private final EntityManager em;

    public List<Metric> fetch(final ZonedDateTime afterward, final ChronoUnit chronoUnit) {
        QTransaction transaction = QTransaction.transaction;
        JPAQuery<Transaction> query = new JPAQuery<>(em);

        final NumberExpression<? extends Number> interval = chronoInterval(transaction, chronoUnit);

        if (FOREVER.equals(chronoUnit)) {
            query = alltimeQuery(transaction, query);
        } else {
            final ZonedDateTime after = after(afterward, chronoUnit);
            query = timeIntervalQuery(chronoUnit, transaction, query, interval, after);
        }

        return query.select(
                Projections.constructor(Metric.class,
                        interval,
                        transaction.status,
                        transaction.count(),
                        transaction.value.sum(),
                        transaction.value.min(),
                        transaction.value.avg(),
                        transaction.value.max()))
                .fetch();
    }

    JPAQuery<Transaction> alltimeQuery(final QTransaction payment, final JPAQuery<Transaction> query) {
        return query
                .from(payment)
                .groupBy(payment.status)
                .orderBy(payment.status.asc());
    }

    JPAQuery<Transaction> timeIntervalQuery(final ChronoUnit chronoUnit, final QTransaction payment, final JPAQuery<Transaction> query,
                                            final NumberExpression<? extends Number> interval, final ZonedDateTime after) {
        return query
                .from(payment)
                .where(
                        payment.timestamp.between(
                                after.toInstant(),
                                before(after, chronoUnit).toInstant()))
                .groupBy(
                        payment.status,
                        interval)
                .orderBy(
                        interval.asc(),
                        payment.status.asc());
    }

    ZonedDateTime after(final ZonedDateTime dateTime, final ChronoUnit chronoUnit) {
        ZonedDateTime o = dateTime;
        switch (chronoUnit) {
            case MONTHS:
                o = o.with(ChronoField.MONTH_OF_YEAR, 1)
                        .with(ChronoField.DAY_OF_MONTH, 1)
                        .with(ChronoField.HOUR_OF_DAY, 0);
                o = zeroTime(o);
                break;
            case DAYS:
                o = o.with(ChronoField.DAY_OF_MONTH, 1)
                        .with(ChronoField.HOUR_OF_DAY, 0);
                o = zeroTime(o);
                break;
            case HOURS:
                o = o.with(ChronoField.HOUR_OF_DAY, 0);
                o = zeroTime(o);
                break;
            default:
                o = zeroTime(o);
        }
        return o;
    }

    NumberExpression<? extends Number> chronoInterval(final QTransaction payment, final ChronoUnit chronoUnit) {
        NumberExpression<? extends Number> o;
        switch (chronoUnit) {
            case MONTHS:
                o = payment.timestamp.month();
                break;
            case DAYS:
                o = payment.timestamp.dayOfMonth();
                break;
            case HOURS:
                o = payment.timestamp.hour();
                break;
            default:
                o = Expressions.asNumber(0);
        }
        return o;
    }

    ZonedDateTime before(final ZonedDateTime after, ChronoUnit chronoUnit) {
        ChronoUnit o;
        switch (chronoUnit) {
            case MONTHS:
                o = ChronoUnit.YEARS;
                break;
            case DAYS:
                o = ChronoUnit.MONTHS;
                break;
            case HOURS:
                o = ChronoUnit.DAYS;
                break;
            default:
                o = FOREVER;
        }
        return after.plus(1, o);
    }

    private ZonedDateTime zeroTime(final ZonedDateTime afterward) {
        ZonedDateTime o = afterward;
        o = o.with(ChronoField.NANO_OF_SECOND, 0);
        o = o.with(ChronoField.SECOND_OF_MINUTE, 0);
        o = o.with(ChronoField.MINUTE_OF_HOUR, 0);
        o = o.with(ChronoField.HOUR_OF_DAY, 0);
        return o;
    }

}
