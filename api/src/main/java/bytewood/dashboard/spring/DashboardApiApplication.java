package bytewood.dashboard.spring;

import bytewood.dashboard.domain.TransactionRepository;
import bytewood.dashboard.domain.entity.Transaction;
import bytewood.dashboard.domain.generator.TransactionGenerator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.web.config.EnableSpringDataWebSupport;

@SuppressWarnings("checkstyle:hideutilityclassconstructor")
@Slf4j
@SpringBootApplication
@EntityScan(basePackageClasses = Transaction.class)
@EnableJpaRepositories(basePackageClasses = TransactionRepository.class)
@EnableSpringDataWebSupport
@RequiredArgsConstructor
@Configuration
public class DashboardApiApplication implements CommandLineRunner {

    private final TransactionRepository repository;

    public static void main(final String[] args) {
        SpringApplication.run(DashboardApiApplication.class, args);
    }

    @Override
    public void run(final String... args) {
        new TransactionGenerator().generate(p -> repository.save(p));
    }
}
