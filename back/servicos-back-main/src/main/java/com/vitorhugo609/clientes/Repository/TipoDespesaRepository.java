package com.vitorhugo609.clientes.Repository;

import com.vitorhugo609.clientes.model.TipoDespesa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoDespesaRepository extends JpaRepository<TipoDespesa, Long> {

}
