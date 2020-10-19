package hu.elte.issuetracker;

import hu.elte.issuetracker.entities.User;
import hu.elte.issuetracker.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class IssuetrackerApplication {

    public static void main(String[] args) {
        SpringApplication.run(IssuetrackerApplication.class, args);
    }

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @EventListener
    public void seed(ContextRefreshedEvent event) {
        for (User user : userRepository.findAll()) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(user);
        }
    }

}
