package hu.elte.issuetracker.repositories;

import hu.elte.issuetracker.entities.Label;
import org.springframework.data.repository.CrudRepository;

public interface LabelRepository extends CrudRepository<Label, Integer> {
    
}
