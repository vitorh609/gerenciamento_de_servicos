package com.vitorhugo609.clientes.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.br.CPF;


import java.time.LocalDate;

@Entity
@Data
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "cpf", nullable = false, length = 11)
    @NotNull( message = "{campo.cpf.obrigatorio}")
    @CPF(message = "{campo.cpf.invalido}")
    private String cpf;

    @Column(name = "nome", nullable = false)
    @NotEmpty(message = "{campo.nome.obrigatorio}")

    private String nome;

    @JsonFormat(pattern = "dd/MM/yyyy")
    @Column(name = "datacadastro", nullable = false, updatable = false)
    private LocalDate dataCadastro;

    @PrePersist
    public void prePersiste(){
        setDataCadastro(LocalDate.now());
    }
}
