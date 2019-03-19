package bytewood.dashboard.spring;

import bytewood.dashboard.domain.entity.Transaction;

import java.math.BigDecimal;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.UUID;

public interface TransactionData {

    SecureRandom random = new SecureRandom();

    default Transaction payment(final Long id, final Instant timestamp, final String status, final BigDecimal value) {
        final Transaction o = new Transaction();
        o.setId(id);
        o.setUuid(UUID.randomUUID());
        o.setTimestamp(timestamp);
        o.setStatus(status);
        o.setValue(value);
        return o;
    }
}
