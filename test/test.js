// // The existing tests in this file should not be modified,
// // but you can add more tests if needed.
const supertest = require('supertest')
const { App } = require('../src/App')
const app = App.createApplication()
const redis = require('../src/utils/redis')

describe('data-storage-api-node', () => {

  afterAll(async (done) => {
    redis.redisClient.quit()
    done()
  })
  test('data-storage-api-node', async done => {
    const putResult = await supertest(app)
      .put('/data/cats')
      .send({ name: 'Copernicus' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
    done()
  // PUT

// //
// //   // GET
//   const hash = putResult.body.oid
//   await supertest(server)
//     .get(`/data/cats/${hash}`)
//     .expect(200)
//     .then(response => {
//       expect(response.body).toEqual({ name: 'Copernicus' })
//     })
// //
// //   // DELETE
// //   await supertest(server)
// //     .delete(`/data/cats/${hash}`)
// //     .expect(200)
// //
// //   await supertest(server)
// //     .get(`/data/cats/${hash}`)
// //     .expect(404)
  })
})