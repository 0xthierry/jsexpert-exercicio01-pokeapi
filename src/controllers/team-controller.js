const TeamService = require("../service/team-service");

class TeamController {
  constructor() {
    this.teamService = new TeamService();
  }

  async index() {
    const result = await this.teamService.getRandomTeam();
    return {
      body: result,
      statusCode: 200,
    };
  }
}

module.exports = TeamController;
