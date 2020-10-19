package hu.elte.issuetracker.repositories;

import hu.elte.issuetracker.entities.Issue;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IssueRepository extends CrudRepository<Issue, Integer> {
    
}
