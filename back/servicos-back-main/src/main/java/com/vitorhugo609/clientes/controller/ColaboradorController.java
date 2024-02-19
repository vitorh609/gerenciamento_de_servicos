package com.vitorhugo609.clientes.controller;

import com.vitorhugo609.clientes.Repository.PrestadorRepository;
import com.vitorhugo609.clientes.model.Prestador;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("api/colaborador")
@RequiredArgsConstructor
public class ColaboradorController {

    private final PrestadorRepository prestadorRepository;
    @PostMapping
    public Prestador createPrestador(@RequestBody @Valid  Prestador prestador){
        return prestadorRepository.save(prestador);
    }

    @GetMapping
    public List<Prestador> listPrestador(){
        return prestadorRepository.findAll();
    }

    @GetMapping("{id}")
    public Prestador findById(@PathVariable Long id){
        return prestadorRepository
                .findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Prestador não encontrado"));
    }

    @PutMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    public Prestador updatePrestaddor(@PathVariable Long id, @RequestBody @Valid Prestador prestadorUpdate){
        Prestador prestadorfind = prestadorRepository.findById(id)
                .map(
                        register -> {
                            register.setCollaborator(prestadorUpdate.getCollaborator());
                            register.setCpf(prestadorUpdate.getCpf());
                            return prestadorRepository.save(register);
                        }
                ).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Prestador não encontrado"));
        return prestadorfind;
    }
}

