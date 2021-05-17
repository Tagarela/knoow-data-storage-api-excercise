// // The existing tests in this file should not be modified,
// // but you can add more tests if needed.
const supertest = require('supertest')
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
      .send({name: 'Copernicus'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)

    // GET
    const hash = putResult.body.data.oid
    const response = await supertest(app)
      .get(`/data/cats/${hash}`)
      .expect(200)
    expect(response.body).toEqual({
      size: 324,
      data: {
          oid: hash,
          hash:
            '69fe64d233ee4de4dee1f43b4e3aef08805e2b1aaed212fb3b5d9cf4a8a58fad',
          data: {name: 'Copernicus'},
          version: 1,
          isActive: 1,
          repository: 'cats'
        }
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
})