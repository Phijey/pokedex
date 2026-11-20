package br.puc.pokedex.repository;

import br.puc.pokedex.model.Pokemon;
import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PokemonRepository extends MongoRepository<Pokemon, Integer> {

    List<Pokemon> findByNameContainingIgnoreCaseOrderByIdAsc(String name);

    List<Pokemon> findByTypesNameIgnoreCaseOrderByIdAsc(String typeName);

    Optional<Pokemon> findTopByOrderByIdDesc();
}
