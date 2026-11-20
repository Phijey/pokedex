package br.puc.pokedex.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/** Documento da coleção {@code types}: tipos elementais disponíveis. */
@Document(collection = "types")
public record PokemonType(@Id Integer id, String name) {
}
