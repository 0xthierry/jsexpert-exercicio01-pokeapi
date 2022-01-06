const Request = require("../lib/request");
const NON_EXISTING_IDS_START = 898;
const SKIP_NON_IDS = 103;

class PokemonRepository {
  constructor() {
    this.pokeapiClient = new Request({ baseURL: "https://pokeapi.co/api/v2" });
  }

  async findById(id) {
    const correctId =
      id > NON_EXISTING_IDS_START ? id - SKIP_NON_IDS : id;
    const { data } = await this.pokeapiClient.get(`/pokemon/${correctId}`);
    return data;
  }

  async count() {
    const {
      data: { count },
    } = await this.pokeapiClient.get(`/pokemon`);
    return count;
  }
}

module.exports = PokemonRepository;
