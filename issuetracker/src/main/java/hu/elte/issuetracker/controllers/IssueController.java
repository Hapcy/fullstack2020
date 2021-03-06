package hu.elte.issuetracker.controllers;

import hu.elte.issuetracker.entities.Issue;
import hu.elte.issuetracker.entities.Label;
import hu.elte.issuetracker.entities.Message;
import hu.elte.issuetracker.entities.User;
import hu.elte.issuetracker.repositories.IssueRepository;
import hu.elte.issuetracker.repositories.LabelRepository;
import hu.elte.issuetracker.repositories.MessageRepository;
import hu.elte.issuetracker.repositories.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/issues")
public class IssueController {
    
    @Autowired
    private IssueRepository issueRepository;
    
    @Autowired
    private MessageRepository messageRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private LabelRepository labelRepository;
    
    @GetMapping("")
    public ResponseEntity<Iterable<Issue>> getAll() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        List<String> roles = auth.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());
        if (roles.contains("ROLE_ADMIN")) {
            return ResponseEntity.ok(issueRepository.findAll());
        }
        String username = auth.getName();
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get().getIssues());
        }
        return ResponseEntity.notFound().build();
    }
    
//    @Secured({ "ROLE_USER", "ROLE_ADMIN" })
    @GetMapping("/{id}")
    public ResponseEntity<Issue> get(@PathVariable Integer id) {
        Optional<Issue> oIssue = issueRepository.findById(id);
        if (oIssue.isPresent()) {
            return ResponseEntity.ok(oIssue.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("")
    public ResponseEntity<Issue> insert(@RequestBody Issue issue) {
        return ResponseEntity.ok(issueRepository.save(issue));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Issue> update(@PathVariable Integer id, @RequestBody Issue issue) {
        Optional<Issue> oIssue = issueRepository.findById(id);
        if (oIssue.isPresent()) {
            issue.setId(id);
            return ResponseEntity.ok(issueRepository.save(issue));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    @Secured({ "ROLE_ADMIN" })
    public ResponseEntity<Issue> delete(@PathVariable Integer id) {
        Optional<Issue> oIssue = issueRepository.findById(id);
        if (oIssue.isPresent()) {
            issueRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/{id}/messages")
    public ResponseEntity<Iterable<Message>> messages(@PathVariable Integer id) {
        Optional<Issue> oIssue = issueRepository.findById(id);
        if (oIssue.isPresent()) {
            return ResponseEntity.ok(oIssue.get().getMessages());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/{id}/messages")
    public ResponseEntity<Message> addMessage(@PathVariable Integer id, @RequestBody Message message) {
        Optional<Issue> oIssue = issueRepository.findById(id);
        if (oIssue.isPresent()) {
            Issue issue = oIssue.get();
            message.setIssue(issue);
            return ResponseEntity.ok(messageRepository.save(message));
//            issue.getMessages().add(message);
//            issueRepository.save(issue);
//            return ResponseEntity.ok(message);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
//    @DeleteMapping("/{issue_id}/messages/{message_id}")
    // MessageController
    // @DeleteMapping("/messages/{id}")
    
    
    @GetMapping("/{id}/labels")
    public ResponseEntity<Iterable<Label>> labels(@PathVariable Integer id) {
        Optional<Issue> oIssue = issueRepository.findById(id);
        if (oIssue.isPresent()) {
            return ResponseEntity.ok(oIssue.get().getLabels());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/{id}/labels")
    public ResponseEntity<Label> addLabel(@PathVariable Integer id, @RequestBody Label label) {
        Optional<Issue> oIssue = issueRepository.findById(id);
        if (oIssue.isPresent()) {
            Issue issue = oIssue.get();
//            label.getIssues().add(issue);
//            return ResponseEntity.ok(labelRepository.save(label));
            Label newLabel = labelRepository.save(label);
            issue.getLabels().add(newLabel);
            issueRepository.save(issue);
            return ResponseEntity.ok(newLabel);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PutMapping("/{id}/labels")
    public ResponseEntity<Iterable<Label>> modifyLabels(
            @PathVariable Integer id, @RequestBody List<Label> labels) {
        Optional<Issue> oIssue = issueRepository.findById(id);
        if (oIssue.isPresent()) {
            Issue issue = oIssue.get();
            
            for (Label label: labels) {
                if (label.getId() == null) {
                    labelRepository.save(label);
                }
            }
            
            issue.setLabels(labels);
            issueRepository.save(issue);
            return ResponseEntity.ok(labels);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
