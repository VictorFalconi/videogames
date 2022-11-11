const { Videogame, conn } = require('../../src/db.js');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
    });
  });
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('released', () => {
      it('should throw an error if released is not required', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires that released field is required')))
          .catch(() => done());
      });
    });
  });
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('description', () => {
      it('should throw an error if description is not required', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires that description field is required')))
          .catch(() => done());
      });
    });
  });
});
