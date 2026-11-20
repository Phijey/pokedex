package br.puc.pokedex.service;

import br.puc.pokedex.exception.ConflictException;
import br.puc.pokedex.exception.NotFoundException;
import br.puc.pokedex.model.Pokemon;
import br.puc.pokedex.repository.PokemonRepository;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class PokemonService {

    private final PokemonRepository repository;

    public PokemonService(PokemonRepository repository) {
        this.repository = repository;
    }

    /** Lista os Pokémon, com filtros opcionais por nome (parcial) e por tipo. */
    public List<Pokemon> findAll(String name, String type) {
        boolean hasName = name != null && !name.isBlank();
        boolean hasType = type != null && !type.isBlank();

        if (!hasName && !hasType) {
            return repository.findAll(Sort.by("id"));
        }
        if (hasName) {
            List<Pokemon> byName = repository.findByNameContainingIgnoreCaseOrderByIdAsc(name.trim());
            if (!hasType) {
                return byName;
            }
            return byName.stream()
                    .filter(p -> p.types().stream().anyMatch(t -> t.name().equalsIgnoreCase(type.trim())))
                    .toList();
        }
        return repository.findByTypesNameIgnoreCaseOrderByIdAsc(type.trim());
    }

    public Pokemon findById(int id) {
        return repository.findById(id)
                .orElseThrow(() -> new NotFoundException("Pokémon #" + id + " não encontrado"));
    }

    /** Se o corpo não trouxer id, usa o próximo número livre da Pokédex. */
    public Pokemon create(Pokemon pokemon) {
        int id = pokemon.id() != null ? pokemon.id() : nextId();
        if (repository.existsById(id)) {
            throw new ConflictException("Já existe um Pokémon com o id " + id);
        }
        return repository.save(pokemon.withId(id));
    }

    /** O id da URL sempre prevalece sobre o do corpo da requisição. */
    public Pokemon update(int id, Pokemon pokemon) {
        if (!repository.existsById(id)) {
            throw new NotFoundException("Pokémon #" + id + " não encontrado");
        }
        return repository.save(pokemon.withId(id));
    }

    public void delete(int id) {
        if (!repository.existsById(id)) {
            throw new NotFoundException("Pokémon #" + id + " não encontrado");
        }
        repository.deleteById(id);
    }

    private int nextId() {
        return repository.findTopByOrderByIdDesc().map(p -> p.id() + 1).orElse(1);
    }
}
