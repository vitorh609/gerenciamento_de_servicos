package com.vitorhugo609.clientes.util;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class BigDeciamalConverter {
    public BigDecimal converter(String value){
        if (value == null){
            return null;
        }
        value = value.replace(".", "").replace(",", ".");
        return new BigDecimal(value);
    }
}
