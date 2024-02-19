package com.vitorhugo609.clientes.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
public class Despesa{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "id_tipodespesa")
    @ManyToOne
    private TipoDespesa tipoDespesa;

    @JoinColumn(name = "id_colaborador")
    @ManyToOne
    private Prestador colaborador;
//    @NotNull(message = "{campo.colaborator.obrigatorio}")


    @Column(name = "descricao")
//    @NotEmpty(message = "{campo.descricao.obrigatorio}")
    private String descricao;

    @Column(name = "data", nullable = false)
//    @NotEmpty(message = "{campo.data.obrigatorio}")
    private LocalDate data;

    @Column(name = "valor", nullable = false)
//    @NotEmpty(message = "{campo.valor.obrigatorio}")
    private BigDecimal valor;
}
