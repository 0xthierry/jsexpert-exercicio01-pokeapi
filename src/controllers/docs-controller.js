class DocsController {
  index() {
    const result = ["/teams - GET - Return three random pokemons"];
    return {
      body: result,
      statusCode: 200,
    };
  }
}

module.exports = DocsController;
