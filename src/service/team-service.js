const Pokemon = require("../entities/Pokemon");
const Random = require("../lib/random");
const PokemonRepository = require("../repositories/pokemon-repository");
const TOTAL_TEAMS = 3;

class TeamService {
  constructor() {
    this.random = Random;
    this.pokemonRepository = new PokemonRepository();
  }

  async getRandomPokemon({ min, max }) {
    const randomId = this.random.randomNumberMinMax({ min, max });
    const pokemon = await this.pokemonRepository.findById(randomId);

    return new Pokemon({
      id: pokemon.id,
      name: pokemon.name,
      moves: pokemon.moves.slice(0, 3).map(({ move }) => move.name),
    });
  }

  async getRandomTeams() {
    const count = await this.pokemonRepository.count();
    const pokemons = await Promise.all(
      Array.from({ length: TOTAL_TEAMS }).map(() =>
        this.getRandomPokemon({ min: 1, max: count })
      )
    );
    return pokemons;
  }
}

module.exports = TeamService;
