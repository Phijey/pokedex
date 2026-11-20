package br.puc.pokedex.controller;

import br.puc.pokedex.model.Pokemon;
import br.puc.pokedex.service.PokemonService;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pokemons")
public class PokemonController {

    private final PokemonService service;

    public PokemonController(PokemonService service) {
        this.service = service;
    }

    @GetMapping
    public List<Pokemon> list(@RequestParam(required = false) String name,
                              @RequestParam(required = false) String type) {
        return service.findAll(name, type);
    }

    @GetMapping("/{id}")
    public Pokemon get(@PathVariable int id) {
        return service.findById(id);
    }

    @PostMapping
    public ResponseEntity<Pokemon> create(@Valid @RequestBody Pokemon pokemon) {
        Pokemon saved = service.create(pokemon);
        return ResponseEntity.created(URI.create("/api/pokemons/" + saved.id())).body(saved);
    }

    @PutMapping("/{id}")
    public Pokemon update(@PathVariable int id, @Valid @RequestBody Pokemon pokemon) {
        return service.update(id, pokemon);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
