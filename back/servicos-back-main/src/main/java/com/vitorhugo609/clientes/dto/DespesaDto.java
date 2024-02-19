package com.vitorhugo609.clientes.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DespesaDto {

    private Long id;

    @NotNull
    private Long idTipoDepesa;

    @NotNull
    private Long idColaborador;

    @NotEmpty(message = "{campo.descricao.obrigatorio}")
    private String descricao;

    @NotEmpty(message = "{campo.data.obrigatorio}")
    private String data;

    @NotEmpty(message = "{campo.valor.obrigatorio}")
    private String valor;
}
