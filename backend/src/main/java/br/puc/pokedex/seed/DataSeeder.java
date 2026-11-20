package br.puc.pokedex.seed;

import br.puc.pokedex.model.Pokemon;
import br.puc.pokedex.model.PokemonType;
import br.puc.pokedex.model.Trainer;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

/**
 * Popula o MongoDB na primeira execução com os dados do Script_Pokedex.sql,
 * já convertidos para o modelo de documentos (resources/seed/*.json).
 * Coleções que já têm dados não são tocadas, então edições feitas via API
 * não são sobrescritas ao reiniciar.
 */
@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    private final MongoTemplate mongo;
    private final ObjectMapper mapper;

    public DataSeeder(MongoTemplate mongo, ObjectMapper mapper) {
        this.mongo = mongo;
        this.mapper = mapper;
    }

    @Override
    public void run(String... args) throws IOException {
        seed(PokemonType.class, "seed/types.json", new TypeReference<List<PokemonType>>() { });
        seed(Pokemon.class, "seed/pokemons.json", new TypeReference<List<Pokemon>>() { });
        seed(Trainer.class, "seed/trainers.json", new TypeReference<List<Trainer>>() { });
    }

    private <T> void seed(Class<T> type, String resource, TypeReference<List<T>> reference) throws IOException {
        if (mongo.estimatedCount(type) > 0) {
            return;
        }
        try (InputStream in = new ClassPathResource(resource).getInputStream()) {
            List<T> documents = mapper.readValue(in, reference);
            mongo.insertAll(documents);
            log.info("Coleção '{}' populada com {} documentos", mongo.getCollectionName(type), documents.size());
        }
    }
}
