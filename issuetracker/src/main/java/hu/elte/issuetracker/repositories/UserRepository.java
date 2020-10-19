package hu.elte.issuetracker.repositories;

import hu.elte.issuetracker.entities.User;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {
    Optional<User> findByUsername(String username);
}
