package br.puc.pokedex.model;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

/** Atributos base de um Pokémon (mesmo formato usado pelo frontend). */
public record Stats(
        @Min(1) @Max(255) int hp,
        @Min(1) @Max(255) int attack,
        @Min(1) @Max(255) int defense,
        @Min(1) @Max(255) int specialAttack,
        @Min(1) @Max(255) int specialDefense,
        @Min(1) @Max(255) int speed) {
}
