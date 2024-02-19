package com.vitorhugo609.clientes.Repository;

import com.vitorhugo609.clientes.model.Prestador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrestadorRepository extends JpaRepository<Prestador, Long> {

}
