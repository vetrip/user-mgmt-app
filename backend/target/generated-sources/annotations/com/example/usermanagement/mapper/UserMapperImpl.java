package com.example.usermanagement.mapper;

import com.example.usermanagement.dto.UserDTO;
import com.example.usermanagement.entity.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-04-04T19:19:18-0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.14 (Homebrew)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User toEntity(UserDTO userDTO) {
        if ( userDTO == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.username( userDTO.getUsername() );
        user.email( userDTO.getEmail() );
        user.firstName( userDTO.getFirstName() );
        user.lastName( userDTO.getLastName() );
        user.status( userDTO.getStatus() );
        user.role( userDTO.getRole() );

        return user.build();
    }

    @Override
    public UserDTO toDTO(User user) {
        if ( user == null ) {
            return null;
        }

        UserDTO userDTO = new UserDTO();

        userDTO.setId( user.getId() );
        userDTO.setUsername( user.getUsername() );
        userDTO.setEmail( user.getEmail() );
        userDTO.setFirstName( user.getFirstName() );
        userDTO.setLastName( user.getLastName() );
        userDTO.setStatus( user.getStatus() );
        userDTO.setCreatedAt( user.getCreatedAt() );
        userDTO.setLastLoginAt( user.getLastLoginAt() );
        userDTO.setRole( user.getRole() );

        return userDTO;
    }
}
