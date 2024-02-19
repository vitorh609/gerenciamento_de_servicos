package com.vitorhugo609.clientes.controller;

import com.vitorhugo609.clientes.Repository.DespesaRepository;
import com.vitorhugo609.clientes.Repository.PrestadorRepository;
import com.vitorhugo609.clientes.Repository.TipoDespesaRepository;
import com.vitorhugo609.clientes.dto.DespesaDto;
import com.vitorhugo609.clientes.model.Despesa;
import com.vitorhugo609.clientes.model.Prestador;
import com.vitorhugo609.clientes.model.TipoDespesa;
import com.vitorhugo609.clientes.util.BigDeciamalConverter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("api/despesa")
@RequiredArgsConstructor
public class DespesaController {
    private final DespesaRepository despesaRepository;
    private final PrestadorRepository prestadorRepository;
    private final TipoDespesaRepository tipoDespesaRepository;
    private final BigDeciamalConverter bigDeciamalConverter;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Despesa create(@RequestBody DespesaDto despesaDto){

        LocalDate data = LocalDate.parse(despesaDto.getData(), DateTimeFormatter.ofPattern("dd/MM/yyyy"));

        Long tipodespesaId = despesaDto.getIdTipoDepesa();
        TipoDespesa despesa = tipoDespesaRepository
                .findById(tipodespesaId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tipo despesa não existe"));

        Long prestadorId = despesaDto.getIdColaborador();
        Prestador prestador = prestadorRepository
                .findById(prestadorId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Prestador não existe"));

        Despesa despesaEnt = new Despesa();
        despesaEnt.setTipoDespesa(despesa);
        despesaEnt.setColaborador(prestador);
        despesaEnt.setData(data);
        despesaEnt.setValor( bigDeciamalConverter.converter(despesaDto.getValor()));
        despesaEnt.setDescricao(despesaDto.getDescricao());
        return despesaRepository.save(despesaEnt);
    }

//    @GetMapping
//    public List<Despesa> getList(){
//        return despesaRepository.findAll();
//    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Page<Despesa> getList(
            @RequestParam(value = "page", defaultValue = "0")Integer pagina,
            @RequestParam(value = "size", defaultValue = "10")Integer tamanhoPagina
    ){
        PageRequest pageRequest = PageRequest.of(pagina, tamanhoPagina);
        return despesaRepository.findAll(pageRequest);
    }

    @GetMapping("{id_despesa}")
    public Despesa findById(@PathVariable Long id_despesa){
        return despesaRepository
                .findById(id_despesa)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Despesa não encontrada!"));
    }

    @PutMapping("{id_despesa}")
    public Despesa update(@PathVariable Long id_despesa, @RequestBody @Valid DespesaDto despesaDto){
        Despesa despesa = despesaRepository.findById(id_despesa).map(
                despesa1 -> {
                    LocalDate data = LocalDate.parse(despesaDto.getData(), DateTimeFormatter.ofPattern("dd/MM/yyyy"));

                    Long tipodespesaId = despesaDto.getIdTipoDepesa();
                    TipoDespesa tipoDespesa = tipoDespesaRepository
                            .findById(tipodespesaId)
                            .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tipo despesa não existe"));

                    Long prestadorId = despesaDto.getIdColaborador();
                    Prestador prestador = prestadorRepository
                            .findById(prestadorId)
                            .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Prestador não existe"));

                    despesa1.setTipoDespesa(tipoDespesa);
                    despesa1.setColaborador(prestador);
                    despesa1.setData(data);
                    despesa1.setValor( bigDeciamalConverter.converter(despesaDto.getValor()));
                    despesa1.setDescricao(despesaDto.getDescricao());
                    return despesaRepository.save(despesa1);
                }
                )
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Despesa não encontrada!"));
        return despesa;

    }

    @DeleteMapping("{id_despesa}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id_despesa){
        despesaRepository
                .findById(id_despesa)
                .map(
                        despesa -> {
                            despesaRepository.delete(despesa);
                            return Void.TYPE;
                        }
                )
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Despesa não encontrada!"));
    }
}
