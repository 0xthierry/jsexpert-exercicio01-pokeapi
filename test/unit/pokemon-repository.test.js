const PokemonRepository = require("../../src/repositories/pokemon-repository");
const { expect } = require("chai");
const { createSandbox } = require("sinon");

const mocks = {
  bulbasaur: require("../mocks/bulbasaur.json"),
  listOfPokemons: require("../mocks/list-of-pokemons.json"),
};

describe("Pokemon Repository Test Suite", () => {
  let pokemonRepository = {};
  let sandbox = {};

  before(() => {
    pokemonRepository = new PokemonRepository();
  });

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => sandbox.restore());

  it("should return 'count' equals to 10 from api response", async () => {
    const listMock = Object.create(mocks.listOfPokemons);
    listMock.count = 10;

    sandbox
      .stub(
        pokemonRepository.pokeapiClient,
        pokemonRepository.pokeapiClient.get.name
      )
      .resolves({ data: listMock });

    const result = await pokemonRepository.count();
    const expected = 10;

    expect(result).to.be.deep.equal(expected);
  });

  it("should return a pokemon with a valid id", async () => {
    const pokemon = Object.create(mocks.bulbasaur);
    pokemon.id = 15;

    sandbox
      .stub(
        pokemonRepository.pokeapiClient,
        pokemonRepository.pokeapiClient.get.name
      )
      .resolves({ data: pokemon });

    const result = await pokemonRepository.findById(pokemon.id);
    const expected = pokemon;

    expect(pokemonRepository.pokeapiClient.get.withArgs(`/pokemon/${pokemon.id}`).calledOnce).to.be.ok
    expect(result).to.be.deep.equal(expected);
  });

  it("should return a pokemon with an invalid id", async () => {
    const INVALID_ID = 902
    const CORRECTOR_FACTOR = 103

    const pokemon = Object.create(mocks.bulbasaur);
    pokemon.id = INVALID_ID - CORRECTOR_FACTOR;

    sandbox
      .stub(
        pokemonRepository.pokeapiClient,
        pokemonRepository.pokeapiClient.get.name
      )
      .resolves({ data: pokemon });
    
    const result = await pokemonRepository.findById(INVALID_ID);
    const expected = pokemon;

    expect(pokemonRepository.pokeapiClient.get.withArgs(`/pokemon/${pokemon.id}`).calledOnce).to.be.ok
    expect(result).to.be.deep.equal(expected);
  });
});
