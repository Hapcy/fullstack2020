package hu.elte.issuetracker.repositories;

import hu.elte.issuetracker.entities.Message;
import org.springframework.data.repository.CrudRepository;

public interface MessageRepository extends CrudRepository<Message, Integer> {
    
}
