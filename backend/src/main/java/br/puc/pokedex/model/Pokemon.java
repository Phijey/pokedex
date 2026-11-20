package br.puc.pokedex.model;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Documento da coleção {@code pokemons}. O {@code id} é o número da Pokédex
 * (e não um ObjectId), o que mantém a URL {@code /api/pokemons/25} amigável.
 */
@Document(collection = "pokemons")
public record Pokemon(
        @Id Integer id,
        @NotBlank @Size(max = 30) String name,
        @NotNull @Valid Stats stats,
        @NotNull List<@Valid TypeRef> types) {

    public Pokemon withId(Integer newId) {
        return new Pokemon(newId, name, stats, types);
    }
}
