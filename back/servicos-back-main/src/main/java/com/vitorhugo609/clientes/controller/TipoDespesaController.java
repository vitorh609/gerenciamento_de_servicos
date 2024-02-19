package com.vitorhugo609.clientes.controller;

import com.vitorhugo609.clientes.Repository.TipoDespesaRepository;
import com.vitorhugo609.clientes.model.Cliente;
import com.vitorhugo609.clientes.model.TipoDespesa;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RequestMapping("api/tipodespesa")
@RestController
@AllArgsConstructor
public class TipoDespesaController {
    private final TipoDespesaRepository tipoDespesaRepository;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TipoDespesa create(@RequestBody @Valid TipoDespesa tipoDespesa){
        tipoDespesaRepository.save(tipoDespesa);
        return tipoDespesa;
    }

//    @GetMapping
//    @ResponseStatus(HttpStatus.OK)
//    public Page<TipoDespesa> getList(
//            @RequestParam(value = "page", defaultValue = "0")Integer pagina,
//            @RequestParam(value = "size", defaultValue = "10")Integer tamanhoPagina
//    ){
//        PageRequest pageRequest = PageRequest.of(pagina, tamanhoPagina);
//        return tipoDespesaRepository.findAll(pageRequest);
//    }
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<TipoDespesa> getlist(){
        return tipoDespesaRepository.findAll();
    }


    @PutMapping("{id}")
    public TipoDespesa update(@PathVariable Long id, @RequestBody @Valid TipoDespesa tipoDespesa){
        return tipoDespesaRepository.findById(id).map(
                register -> {
                    register.setTipoDespesa(tipoDespesa.getTipoDespesa());
                    return tipoDespesaRepository.save(register);
                }
        ).orElseThrow(() -> new ResponseStatusException(HttpStatus.OK));
    }
}
