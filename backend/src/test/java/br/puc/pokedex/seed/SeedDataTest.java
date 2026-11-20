package br.puc.pokedex.seed;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import br.puc.pokedex.model.Pokemon;
import br.puc.pokedex.model.PokemonType;
import br.puc.pokedex.model.Trainer;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.InputStream;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.core.io.ClassPathResource;

/** Garante que os JSONs de seed continuam íntegros e compatíveis com o modelo. */
class SeedDataTest {

    private final ObjectMapper mapper = new ObjectMapper();

    private <T> List<T> load(String resource, TypeReference<List<T>> ref) throws Exception {
        try (InputStream in = new ClassPathResource(resource).getInputStream()) {
            return mapper.readValue(in, ref);
        }
    }

    @Test
    void carregaTodosOsDocumentosDoScript() throws Exception {
        List<PokemonType> types = load("seed/types.json", new TypeReference<>() { });
        List<Pokemon> pokemons = load("seed/pokemons.json", new TypeReference<>() { });
        List<Trainer> trainers = load("seed/trainers.json", new TypeReference<>() { });

        assertEquals(18, types.size());
        assertEquals(151, pokemons.size());
        assertEquals(12, trainers.size());

        Pokemon pikachu = pokemons.stream().filter(p -> p.id() == 25).findFirst().orElseThrow();
        assertEquals("Pikachu", pikachu.name());
        assertEquals(90, pikachu.stats().speed());
        assertEquals("Electric", pikachu.types().get(0).name());

        Trainer koga = trainers.stream().filter(t -> t.name().equals("Koga")).findFirst().orElseThrow();
        assertEquals(3, koga.pokemonIds().stream().filter(id -> id == 48).count());
        assertTrue(pokemons.stream().anyMatch(p -> p.name().equals("Farfetch'd")));
    }
}
