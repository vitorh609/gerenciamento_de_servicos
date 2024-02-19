package com.vitorhugo609.clientes.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Data
public class TipoDespesa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "{campo.despesa.obrigatorio}")
    @Column(name = "tipodespesa")
    private String tipoDespesa;

}
