package com.vitorhugo609.clientes.Repository;

import com.vitorhugo609.clientes.model.Despesa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DespesaRepository extends JpaRepository< Despesa, Long> {
}
