package bytewood.dashboard.domain;

import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RestResource;

import java.io.Serializable;

@NoRepositoryBean
public interface ReadOnlyPagingAndSortingRepository<T, ID extends Serializable> extends PagingAndSortingRepository<T, ID> {

    @Override
    @RestResource(exported = false)
    <S extends T> S save(S s);

    @Override
    @RestResource(exported = false)
    void delete(T t);

    @Override
    @RestResource(exported = false)
    <S extends T> Iterable<S> saveAll(Iterable<S> iterable);

    @Override
    @RestResource(exported = false)
    void deleteById(ID id);

    @Override
    @RestResource(exported = false)
    void deleteAll(Iterable<? extends T> iterable);

    @Override
    @RestResource(exported = false)
    void deleteAll();
}
