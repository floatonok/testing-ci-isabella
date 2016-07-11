/* globals describe it before*/
const expect = require('chai').expect
const supertest = require('supertest')
const app = require('../app')
const api = supertest('http://localhost:3000')

// GET /candies
describe('GET /candies', () => {
  it('should return a 200 response', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .expect(200, done)
  })

  it('should return an array', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.a('null')
      expect(response.body).to.be.an('array')
      done()
    })
  })

  it('should return all the records in the database', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.a('null')
      expect(response.body.length).to.equal(4)
      done()
    })
  })
})

// GET /candies/:id
describe('GET /candies/:id', () => {
  it('should return a 200 response', (done) => {
    api.get('/candies/1')
    .set('Accept', 'application/json')
    .expect(200, done)
  })

  // should return an object containing the fields "name" and "color"
  it('should return an object containing the fields "name" and "color"', (done) => {
    api.get('/candies/1')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.a('null')
      expect(response.body).to.have.property('name')
      expect(response.body).to.have.property('color')
      done()
    })
  })
})

// POST /candies
describe('POST /candies', () => {
  before((done) => {
    api.post('/candies')
    .set('Accept', 'application/json')
    .send({
      'id': 5,
      'name': 'Lollipop',
      'color': 'Rainbow'
    }).end(done)
  })

  it('should return a 200 response', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .expect(200, done)
  })

  // should return a 422 response if the field color is wrong
  it('should return a 422 if the field color is wrong', (done) => {
    api.post('/candies')
      .set('Accept', 'application/json')
      .send({'id': 6, 'name': 'lychee', 'color': 'wrong'})
      .expect(422, done)
  })

  // should return an error message if the color field is wrong
  it('should add an error message if the color field is wrong', (done) => {
    api.post('/candies')
      .set('Accept', 'application/json')
      .send({'id': 7, 'name': 'apple', 'color': 'wrong'})
      .end((error, response) => {
        expect(error).to.be.a('null')
        expect(response.body.message).to.equal('wrong color')
        done()
      })
  })

  // should add a new candy to the database
  it('should add a new candy to the database', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.a('null')
      // expect(response.body.length).to.equal(5)
      expect(response.body[response.body.length - 1].name).to.equal('Lollipop')
      done()
    })
  })

  // should return an error if the color is wrong
})

// PUT /candies/:id
describe('PUT /candies/:id', () => {
  before((done) => {
    api.put('/candies/4')
    .set('Accept', 'application/json')
    .send({
      'id': 4,
      'name': 'Lollipop',
      'color': 'Black'
    }).end(done)
  })

  it('should return a 200 response', (done) => {
    api.get('/candies/4')
    .set('Accept', 'application/json')
    .expect(200, done)
  })

  // should update a candy document
  it('should update a candy document', (done) => {
    api.get('/candies/4')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.a('null')
      expect(response.body.color).to.equal('Black')
      done()
    })
  })
})

// DELETE /candies/:id
describe('DELETE /candies/:id', () => {
  before((done) => {
    api.delete('/candies/2')
    .set('Accept', 'application/json')
    .end(done)
  })

  // should delete a candy document
  it('should delete a candy document', (done) => {
    api.get('/candies/2')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.a('null')
      expect(response.body.color).to.equal('Pink')
      done()
    })
  })
})
