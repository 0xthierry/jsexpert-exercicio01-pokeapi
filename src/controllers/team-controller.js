const TeamService = require("../service/team-service");

class TeamController {
  constructor() {
    this.teamService = new TeamService();
  }

  async index() {
    const result = await this.teamService.getRandomTeams();
    return {
      body: result,
      statusCode: 200,
    };
  }
}

module.exports = TeamController;
