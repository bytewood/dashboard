package bytewood.dashboard.domain.generator;

import bytewood.dashboard.domain.entity.Status;
import bytewood.dashboard.domain.entity.Transaction;
import lombok.extern.slf4j.Slf4j;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.Random;
import java.util.UUID;
import java.util.function.Consumer;

@Slf4j
public class TransactionGenerator {
    private static final String[] STATUSES = new String[]{
            Status.IN_PROGRESS.name(),
            Status.REVIEW.name(),
            Status.PARTIAL.name(),
            Status.FAILED.name(),
            Status.SUCCESSFUL.name()
    };

    private static final Random RANDOM = new Random(Integer.MAX_VALUE);

    public void generate(Consumer<Transaction> transactionConsumer) {
        int year = LocalDate.now().getYear();

        ZonedDateTime dateTime = ZonedDateTime.of(year, 1, 1, 0, 0, 0, 0, ZoneId.systemDefault());

        Long id = 0L;

        for (int month = 1; month < 13; month++) {
            dateTime = dateTime.withMonth(month);
            long monthlySampleCount = 0;

            for (int day = 1; day <= lastDayOfMonth(dateTime); day++) {
                dateTime = dateTime.withDayOfMonth(day);

                for (int hour = 0; hour < 24; hour++) {
                    dateTime = dateTime.withHour(hour);

                    for (int minute = 0; minute < 60; minute++) {
                        dateTime = dateTime.withMinute(minute);

                        if (canAddForThisDay(dateTime) && canAddForThisHour(dateTime) && canAddForThisMinute(minute)) {
                                    monthlySampleCount++;
                                    transactionConsumer.accept(transaction(id++, status(), dateTime.toInstant(), value()));
                        }
                    }
                }
            }
            log.info("[__________] Generated {} samples for {} {}", monthlySampleCount, dateTime.getYear(), dateTime.getMonth());
        }
    }

    private boolean canAddForThisDay(final ZonedDateTime dateTime) {
        int[] weights = new int[]{8, 6, 5, 6, 9, 2, 1};
        return RANDOM.nextInt(10) >= 9 - weights[dateTime.getDayOfWeek().getValue() - 1];
    }

    private boolean canAddForThisHour(ZonedDateTime dateTime) {
        int[] weights = new int[]{5, 3, 2, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 89, 55, 34, 21, 34, 21, 13, 13, 21, 13, 8};
        return RANDOM.nextInt(90) >= 89 - weights[dateTime.getHour()];
    }

    private BigDecimal value() {
        return BigDecimal.valueOf(RANDOM.nextInt(100) * 10);
    }

    private boolean canAddForThisMinute(final int minute) {
        return RANDOM.nextInt(60) < 40;
    }

    int lastDayOfMonth(final ZonedDateTime dateTime) {
        return dateTime.with(TemporalAdjusters.lastDayOfMonth()).getDayOfMonth();
    }

    String status() {
        final int i = RANDOM.nextInt(50);
        if (i <= 1) {
            return Status.REVIEW.name();
        } else if (i <= 2) {
            return Status.IN_PROGRESS.name();
        } else if (i <= 4) {
            return Status.PARTIAL.name();
        } else if (i <= 8) {
            return Status.FAILED.name();
        } else {
            return Status.SUCCESSFUL.name();
        }
    }

    Transaction transaction(final Long id, final String status, final Instant instant, final BigDecimal value) {
        final Transaction o = new Transaction();
        o.setId(id);
        o.setValue(value);
        o.setTimestamp(instant);
        o.setUuid(UUID.randomUUID());
        o.setStatus(status);
        return o;
    }
}
