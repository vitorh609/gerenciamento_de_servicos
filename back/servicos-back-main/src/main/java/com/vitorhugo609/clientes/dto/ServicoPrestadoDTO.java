package com.vitorhugo609.clientes.dto;


import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ServicoPrestadoDTO {

    private Long id;

    @NotEmpty(message = "{campo.descricao.obrigatorio} ")
    private String  descricao;

    @NotEmpty(message = "{campo.preco.obrigatorio} ")
    private String valor;

    @NotEmpty(message = "{campo.data.obrigatorio} ")
    private String data;

    @NotNull(message = "{campo.cliente.obrigatorio}")
    private Long idCliente;
}
