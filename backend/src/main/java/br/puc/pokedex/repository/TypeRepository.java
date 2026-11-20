package br.puc.pokedex.repository;

import br.puc.pokedex.model.PokemonType;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TypeRepository extends MongoRepository<PokemonType, Integer> {
}
