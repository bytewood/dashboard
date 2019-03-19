package bytewood.dashboard.domain.generator;

import bytewood.dashboard.domain.entity.Status;
import bytewood.dashboard.domain.entity.Transaction;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.counting;
import static java.util.stream.Collectors.groupingBy;
import static org.assertj.core.api.Assertions.assertThat;

public class TransactionGeneratorTest {

    private TransactionGenerator testObject;

    @Before
    public void setUp()  {
        testObject = new TransactionGenerator();
    }

    @Test
    public void generateList() {
        final List<Transaction> actual = new ArrayList<>();
        testObject.generate(p -> actual.add(p));

        final Map<String, Long> counts = actual.stream().collect(groupingBy(t -> t.getStatus(), counting()));

        assertThat(counts.get(Status.SUCCESSFUL.name())).isGreaterThan(counts.get(Status.FAILED.name()));
        assertThat(counts.get(Status.FAILED.name())).isGreaterThan(counts.get(Status.PARTIAL.name()));
        assertThat(counts.get(Status.PARTIAL.name())).isGreaterThan(counts.get(Status.IN_PROGRESS.name()));
        assertThat(counts.get(Status.IN_PROGRESS.name())).isGreaterThan(0);
        assertThat(counts.get(Status.REVIEW.name())).isGreaterThan(0);
    }

    @Test
    public void status() {
        final String actual = testObject.status();

        assertThat(actual).isNotNull();
    }
}
