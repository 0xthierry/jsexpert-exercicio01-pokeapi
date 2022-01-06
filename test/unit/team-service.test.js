const TeamService = require("../../src/service/team-service");
const Pokemon = require("../../src/entities/Pokemon");
const { expect } = require("chai");
const { createSandbox } = require("sinon");

const mocks = {
  bulbasaur: require("../mocks/bulbasaur.json"),
  listOfPokemons: require("../mocks/list-of-pokemons.json"),
};

describe("Team Service Test Suite", () => {
  let teamService = {};
  let sandbox = {};

  before(() => {
    teamService = new TeamService();
  });

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => sandbox.restore());

  it("should return the first pokemon in range between 1 and 10", async () => {
    sandbox
      .stub(teamService.random, teamService.random.randomNumberMinMax.name)
      .returns(1);

    sandbox
      .stub(
        teamService.pokemonRepository,
        teamService.pokemonRepository.findById.name
      )
      .resolves(mocks.bulbasaur);

    const result = await teamService.getRandomPokemon({ min: 1, max: 10 });

    const expected = new Pokemon({
      id: mocks.bulbasaur.id,
      name: mocks.bulbasaur.name,
      moves: mocks.bulbasaur.moves.slice(0, 3).map(({ move }) => move.name),
    });

    expect(result).to.be.deep.equal(expected);
  });

  it("should return three pokemon with name and first three moves", async () => {
    sandbox
      .stub(
        teamService.pokemonRepository,
        teamService.pokemonRepository.count.name
      )
      .resolves(10);

    const pokemon = new Pokemon({
      id: mocks.bulbasaur.id,
      name: mocks.bulbasaur.name,
      moves: mocks.bulbasaur.moves.slice(0, 3).map(({ move }) => move.name),
    });

    sandbox
      .stub(teamService, teamService.getRandomPokemon.name)
      .resolves(pokemon);

    const result = await teamService.getRandomTeams();
    const expected = [pokemon, pokemon, pokemon];

    expect(teamService.getRandomPokemon.calledThrice).to.be.ok;
    expect(result).to.deep.include.members(expected);
  });
});
