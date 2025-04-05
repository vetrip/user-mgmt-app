package com.example.usermanagement.config;

import com.example.usermanagement.entity.User;
import com.example.usermanagement.entity.UserRole;
import com.example.usermanagement.entity.UserStatus;
import com.example.usermanagement.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import java.time.LocalDateTime;
@Configuration
@Profile("!test")
@RequiredArgsConstructor
public class DataInitializer {

    private final UserRepository userRepository;

    @PostConstruct
    public void init() {
        if (userRepository.count() == 0) {
            // Create admin user
            User admin = User.builder()
                    .username("admin")
                    .email("admin@example.com")
                    .firstName("Admin")
                    .lastName("User")
                    .role(UserRole.ADMIN)
                    .createdAt(LocalDateTime.now())
                    .status(UserStatus.ACTIVE)
                    .build();
            userRepository.save(admin);

            // Create regular user
            User user = User.builder()
                    .username("user")
                    .email("user@example.com")
                    .firstName("Regular")
                    .lastName("User")
                    .role(UserRole.USER)
                    .createdAt(LocalDateTime.now())
                    .status(UserStatus.ACTIVE)
                    .build();
            userRepository.save(user);
        }
    }
} 