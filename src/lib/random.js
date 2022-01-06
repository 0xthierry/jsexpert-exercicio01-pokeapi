class Random {
  static randomNumberMinMax({ min, max }) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

module.exports = Random;
