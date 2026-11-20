package br.puc.pokedex.model;

import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Documento da coleção {@code trainers}. A relação treinador x Pokémon fica
 * embutida em {@code pokemonIds} (ids repetidos indicam mais de um exemplar).
 */
@Document(collection = "trainers")
public record Trainer(@Id Integer id, String name, int badges, List<Integer> pokemonIds) {
}
