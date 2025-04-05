package com.example.usermanagement.dto;

import com.example.usermanagement.entity.UserRole;
import com.example.usermanagement.entity.UserStatus;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private UserStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime lastLoginAt;
    private UserRole role;
} 