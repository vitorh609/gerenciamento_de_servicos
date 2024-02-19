package com.vitorhugo609.clientes.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import org.hibernate.validator.constraints.br.CPF;

@Entity
@Data
public class Prestador {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idprestador")
    @JsonProperty(value = "collaboratorId")
    private Long id;

    @Column(name = "prestador")
    @NotEmpty(message = "{campo.colaborator.obrigatorio}")
    private String collaborator;

    @Column(name = "cpf")
    @CPF(message = "{campo.cpf.invalido}")
    @NotEmpty(message = "{campo.cpf.obrigatorio}")
    private String cpf;
}
