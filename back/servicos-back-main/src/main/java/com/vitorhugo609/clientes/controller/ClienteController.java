package com.vitorhugo609.clientes.controller;

import com.vitorhugo609.clientes.Repository.ClienteRepository;
import com.vitorhugo609.clientes.model.Cliente;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


import java.util.List;

@RestController
@RequestMapping("api/cliente")
@RequiredArgsConstructor
public class ClienteController {
    private final ClienteRepository clienteRepository;

    @PostMapping
    public Cliente createCliente(@RequestBody @Valid Cliente cliente){
        return clienteRepository.save(cliente);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Page<Cliente> getCliente(
            @RequestParam(value = "page", defaultValue = "0")Integer pagina,
            @RequestParam(value = "size", defaultValue = "10")Integer tamanhoPagina
            ){
        PageRequest pageRequest = PageRequest.of(pagina, tamanhoPagina);
        return  clienteRepository.findAll(pageRequest);
    }

    @GetMapping("{id}")
    public Cliente findByIdCliente(@PathVariable Long id){
        return clienteRepository
                .findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));
    }

//    @GetMapping
//    @ResponseStatus(HttpStatus.OK)
//    public Page<Contact> listContact(
//            @RequestParam(value = "page", defaultValue = "0") Integer pagina,
//            @RequestParam(value = "size", defaultValue = "10") Integer tamanhoPagina
//    ){
//        PageRequest pageRequest = PageRequest.of(pagina, tamanhoPagina);
//
//        return contactRepository.findAll(pageRequest );
//    }

    @PutMapping("{id}")
    private void updateCliente(@PathVariable Long id, @RequestBody @Valid Cliente clienteUpdate ){
        clienteRepository.findById(id).map(
            cliente -> {
                cliente.setCpf(clienteUpdate.getCpf());
                cliente.setNome(clienteUpdate.getNome());
               return clienteRepository.save(cliente);
            })
            .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado") );
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCliente(@PathVariable Long id){
        clienteRepository
                .findById(id)
                .map( cliente -> {
                    clienteRepository.delete(cliente);
                    System.out.println(cliente);
                    return Void.TYPE;
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado" ));
    }
//    @DeleteMapping("{id}")
//    @ResponseStatus(HttpStatus.NO_CONTENT)
//    public void deleteCliente(@PathVariable Long id){
//        clienteRepository
//            .findById(id)
//                .map( cliente -> {
//                    clienteRepository.delete(cliente);
//                    System.out.println(cliente);
//                    return Void.TYPE;
//                })
//            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado" ));
//    }
}
