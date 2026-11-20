package br.puc.pokedex.controller;

import br.puc.pokedex.exception.NotFoundException;
import br.puc.pokedex.model.Trainer;
import br.puc.pokedex.repository.TrainerRepository;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/trainers")
public class TrainerController {

    private final TrainerRepository repository;

    public TrainerController(TrainerRepository repository) {
        this.repository = repository;
    }

    /** Lista treinadores; {@code name} filtra por nome e {@code pokemonId} pelos donos de um Pokémon. */
    @GetMapping
    public List<Trainer> list(@RequestParam(required = false) String name,
                              @RequestParam(required = false) Integer pokemonId) {
        if (pokemonId != null) {
            return repository.findByPokemonIdsOrderByIdAsc(pokemonId);
        }
        if (name != null && !name.isBlank()) {
            return repository.findByNameContainingIgnoreCaseOrderByIdAsc(name.trim());
        }
        return repository.findAll(Sort.by("id"));
    }

    @GetMapping("/{id}")
    public Trainer get(@PathVariable int id) {
        return repository.findById(id)
                .orElseThrow(() -> new NotFoundException("Treinador #" + id + " não encontrado"));
    }
}
