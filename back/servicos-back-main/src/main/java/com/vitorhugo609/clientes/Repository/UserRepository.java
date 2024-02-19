package com.vitorhugo609.clientes.Repository;

import com.vitorhugo609.clientes.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("select s from usuario s where s.username = :username and s.password = :password")
    User findByUsername(@Param("username") String username, @Param("password")String password);
}
