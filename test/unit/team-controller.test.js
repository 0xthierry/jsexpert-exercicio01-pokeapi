const TeamController = require("../../src/controllers/team-controller");
const Pokemon = require("../../src/entities/Pokemon");
const { expect } = require("chai");
const { createSandbox } = require("sinon");

const mocks = {
  bulbasaur: require("../mocks/bulbasaur.json"),
};

describe("Team Controller Test Suite", () => {
  let teamController = {};
  let sandbox = {};
  
  before(() => {
    teamController = new TeamController();
  });

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => sandbox.restore());

  it("should return the three random pokemons", async () => {
    const pokemon = new Pokemon({
      id: mocks.bulbasaur.id,
      name: mocks.bulbasaur.name,
      moves: mocks.bulbasaur.moves.slice(0, 3).map(({ move }) => move.name),
    });

    sandbox
      .stub(
        teamController.teamService,
        teamController.teamService.getRandomTeam.name
      )
      .resolves([pokemon, pokemon, pokemon]);

    const result = await teamController.index();

    const expected = {
      body: [pokemon, pokemon, pokemon],
      statusCode: 200,
    };

    expect(result).to.be.deep.equal(expected);
  });
});
