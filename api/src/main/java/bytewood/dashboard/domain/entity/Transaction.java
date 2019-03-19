package bytewood.dashboard.domain.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Data
@Entity
@Table(name = "TXN")
public class Transaction {
    @Id
    private Long id;
    private UUID uuid;
    private Instant timestamp;
    private String status;
    private BigDecimal value;
}
