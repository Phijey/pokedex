package br.puc.pokedex.controller;

import br.puc.pokedex.model.PokemonType;
import br.puc.pokedex.repository.TypeRepository;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/types")
public class TypeController {

    private final TypeRepository repository;

    public TypeController(TypeRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<PokemonType> list() {
        return repository.findAll(Sort.by("id"));
    }
}
