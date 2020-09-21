package hu.elte.issuetracker.controller;

import hu.elte.issuetracker.model.Issue;
import hu.elte.issuetracker.model.Message;
import hu.elte.issuetracker.repository.IssueRepository;
import hu.elte.issuetracker.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/issues")
public class IssueController {

    private IssueRepository issueRepository;
    private MessageRepository messageRepository;

    public IssueController(
            @Autowired IssueRepository issueRepository,
            @Autowired MessageRepository messageRepository
    ) {
        this.issueRepository = issueRepository;
        this.messageRepository = messageRepository;
    }

    @GetMapping("")
    public ResponseEntity<Iterable<Issue>> getIssues(@RequestParam(required = false) String title) {
        Iterable<Issue> issues;
        if (title == null) {
            issues = issueRepository.findAll();
        } else {
            issues = issueRepository.findAllByTitleContains(title);
        }
        return ResponseEntity.ok(issues);
    }

    @GetMapping("/{issueId}")
    public ResponseEntity<Issue> getIssue(@PathVariable Integer issueId) {
        Optional<Issue> optionalIssue = issueRepository.findById(issueId);
        if (optionalIssue.isPresent()) {
            return ResponseEntity.ok(optionalIssue.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("")
    public ResponseEntity<Issue> createIssue(@RequestBody Issue issue) {
        issue.setStatus(Issue.Status.NEW);
        Issue savedIssue = issueRepository.save(issue);
        return ResponseEntity.ok(savedIssue);
    }

    @DeleteMapping("/{issueId}")
    public ResponseEntity deleteIssue(@PathVariable Integer issueId) {
        try {
            issueRepository.deleteById(issueId);
            return ResponseEntity.ok().build();
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{issueId}/messages")
    public ResponseEntity<Message> createMessage(@RequestBody Message message, @PathVariable Integer issueId) {
        Optional<Issue> optionalIssue = issueRepository.findById(issueId);
        if (!optionalIssue.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Issue issue = optionalIssue.get();
        message.setIssue(issue);
        Message createdMessage = messageRepository.save(message);
        return ResponseEntity.ok(createdMessage);
    }

    @PutMapping("/{issueId}")
    public ResponseEntity<Issue> modifyIssue(@RequestBody Issue issueModification, @PathVariable Integer issueId) {
        Optional<Issue> optionalIssue = issueRepository.findById(issueId);
        if (!optionalIssue.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Issue issue = optionalIssue.get();
        issue.setDescription(issueModification.getDescription());
        issue.setPlace(issueModification.getPlace());
        issue.setStatus(issueModification.getStatus());
        Issue modifiedIssue = issueRepository.save(issue);
        return ResponseEntity.ok(modifiedIssue);
    }
}
