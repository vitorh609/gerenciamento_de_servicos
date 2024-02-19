package com.vitorhugo609.clientes.controller;

import com.vitorhugo609.clientes.Repository.ClienteRepository;
import com.vitorhugo609.clientes.Repository.ServicoRepository;
import com.vitorhugo609.clientes.dto.ServicoPrestadoDTO;
import com.vitorhugo609.clientes.model.Cliente;
import com.vitorhugo609.clientes.model.ServicoPrestado;
import com.vitorhugo609.clientes.util.BigDeciamalConverter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/servico")
@RequiredArgsConstructor
public class ServicoPrestadoController {
    private final ServicoRepository servicoRepository ;
    private final ClienteRepository clienteRepository;
    private final BigDeciamalConverter bigDeciamlConverter;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ServicoPrestado createServico(@RequestBody @Valid ServicoPrestadoDTO dto){
        //transforma data para string
        LocalDate data = LocalDate.parse(dto.getData(), DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        Long clienteId = dto.getIdCliente();
        //Primeiro faz a busca pelo cliente. Se cliente não existir retorna uma BAD_REQUEST
        Cliente cliente = clienteRepository
                .findById(clienteId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, "Cliente não existe"));

        ServicoPrestado servicoPrestado = new ServicoPrestado();
        servicoPrestado.setDescricao(dto.getDescricao());
        servicoPrestado.setData(data);
        servicoPrestado.setCliente(cliente);
        //Converte um bigDecimal para string
        servicoPrestado.setValor( bigDeciamlConverter.converter(dto.getValor()) );

        return servicoRepository.save(servicoPrestado);
    }

    @PutMapping("{id}")
    public ResponseEntity<ServicoPrestadoDTO> updateServico(@PathVariable Long id, @RequestBody @Valid ServicoPrestadoDTO servicoPrestado){
        servicoRepository.findById(id).map(
                servico -> {
                    LocalDate data = LocalDate.parse(servicoPrestado.getData(), DateTimeFormatter.ofPattern("dd/MM/yyyy"));
                    Long idCliente = servicoPrestado.getIdCliente();
                    Cliente cliente = clienteRepository
                            .findById(idCliente)
                                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));
                    servico.setCliente(cliente);
                    servico.setData(data);
                    servico.setDescricao(servicoPrestado.getDescricao());
                    servico.setValor( bigDeciamlConverter.converter(servicoPrestado.getValor()) );
                    return servicoRepository.save(servico);
                }
        );
        return new  ResponseEntity<ServicoPrestadoDTO>(HttpStatus.OK);
    }

    @GetMapping
    public List<ServicoPrestado> searchServico(
            @RequestParam(value = "nome", required = false, defaultValue = "")String nome,
            @RequestParam(value = "mes", required = false)Integer mes
    ){
        //Passa nome e mes por parametro para ser executada a query
        return servicoRepository.findByNomeClienteAndMes("%" + nome + "%", mes);
    }

//    @GetMapping("{id}")
//    public ServicoPrestado servicoPrestado(@PathVariable Long id){
//        return this.servicoRepository
//                .findById(id)
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Servico nao encontrado"));
//    }

    @GetMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ServicoPrestadoDTO> findById(@PathVariable Long id){
        Optional<ServicoPrestado> servicoPrestadoDTO = servicoRepository.findById(id);

        if (servicoPrestadoDTO.isPresent()) {
            ServicoPrestado servico = servicoPrestadoDTO.get();
            ServicoPrestadoDTO servicoDTO = new ServicoPrestadoDTO();

            servicoDTO.setId(servico.getId().longValue());
            servicoDTO.setData(servico.getData().toString());
            servicoDTO.setDescricao(servico.getDescricao());
            servicoDTO.setValor(servico.getValor().toString());
            servicoDTO.setIdCliente(servico.getCliente().getId().longValue());

            return ResponseEntity.ok(servicoDTO);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Servico nao encontrado");
        }

    }

    @GetMapping("all-services")
    public List<ServicoPrestado> searchServicos(){
        return this.servicoRepository.findAll();
    }

}
