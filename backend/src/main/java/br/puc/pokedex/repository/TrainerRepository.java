package br.puc.pokedex.repository;

import br.puc.pokedex.model.Trainer;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TrainerRepository extends MongoRepository<Trainer, Integer> {

    List<Trainer> findByNameContainingIgnoreCaseOrderByIdAsc(String name);

    List<Trainer> findByPokemonIdsOrderByIdAsc(int pokemonId);
}
