// // The existing tests in this file should not be modified,
// // but you can add more tests if needed.
const supertest = require('supertest')
require('dotenv').config()
const { App } = require('../src/App')
const { TestHelper } = require('./TestHelper')
const app = App.createApplication()

describe('data-storage-api-node', () => {
  beforeEach(TestHelper.setUp)
  afterEach(TestHelper.tearDown)
  afterAll(TestHelper.tearAllDown)

  test('data-storage-api-node', async done => {
    // PUT
    const putResult = await supertest(app)
      .put('/data/cats')
      .send({ name: 'Copernicus' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)

    // GET
    const hash = putResult.body.oid
    const response = await supertest(app)
      .get(`/data/cats/${hash}`)
      .expect(200)
    expect(response.body).toEqual({
      size: 28,
      oid: hash,
      version: 1,
      data: { name: 'Copernicus' }
    })

    // DELETE
    await supertest(app)
      .delete(`/data/cats/${hash}`)
      .expect(204)
    await supertest(app)
      .get(`/data/cats/${hash}`)
      .expect(404)
    done()
  })

  test('should return error because of the duplicates', async done => {
    // PUT
    const response = await supertest(app)
      .put('/data/cats')
      .send({ name: 'Copernicus' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
    const id = response.body.oid
    // update object (should get error because of duplicates)
    await supertest(app)
      .put(`/data/cats/${id}`)
      .send({ name: 'Copernicus' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(409)

    done()
  })

  test('should publish new version', async done => {
    // PUT
    let response = await supertest(app)
      .put('/data/cats')
      .send({ name: 'Copernicus' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
    const id = response.body.oid

    response = await supertest(app)
      .get(`/data/cats/${id}`)
      .expect(200)
    expect(response.body.version).toEqual(1)

    response = await supertest(app)
      .put(`/data/cats/${id}`)
      .send({ name: 'Copernicus', age: 1 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
    expect(response.body.version).toEqual(2)
    return done()
  })
})
