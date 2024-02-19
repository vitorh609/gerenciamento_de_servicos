package com.vitorhugo609.clientes.controller;

import com.vitorhugo609.clientes.Repository.UserRepository;
import com.vitorhugo609.clientes.model.User;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(@RequestBody @Valid User user){
        return userRepository.save(user);
    }

    @GetMapping("authorization")
    public User authorizationLogin(
            @RequestParam(value = "username")String username,
            @RequestParam(value = "password", required = false)String password
    ) throws Exception {

        User user =  this.userRepository.findByUsername(username, password);

        if (user == null){
            throw new Exception("Usuário ou senha inválidos");
        }else if (!user.getPassword().equals(password)){
            throw new Exception("Usuário ou senha inválidos");
        }
        return user;
    }

}
