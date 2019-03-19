package bytewood.dashboard.spring;

import bytewood.dashboard.domain.entity.Transaction;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CustomRepositoryRestConfigurer extends RepositoryRestConfigurerAdapter {

    @Override
    public void configureRepositoryRestConfiguration(final RepositoryRestConfiguration config) {
        config.exposeIdsFor(Transaction.class)
                .getCorsRegistry().addMapping("/**").allowedOrigins("*");
    }
}
