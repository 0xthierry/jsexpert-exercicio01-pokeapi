const Request = require("../lib/request");
const PROBLEMATIC_IDS_START = 898;
class PokemonRepository {
  constructor() {
    this.pokeapiClient = new Request({ baseURL: "https://pokeapi.co/api/v2" });
  }

  async findById(id) {
    const correctId =
      id > PROBLEMATIC_IDS_START ? id - PROBLEMATIC_IDS_START : id;
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
