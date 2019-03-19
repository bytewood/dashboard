package bytewood.dashboard.domain;

import bytewood.dashboard.domain.entity.Transaction;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.UUID;

@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "transactions", path = "transaction")
public interface TransactionRepository
        extends ReadOnlyPagingAndSortingRepository<Transaction, UUID>, QuerydslPredicateExecutor<Transaction> {
}
