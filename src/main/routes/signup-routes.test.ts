import request from 'supertest'
import app from '../config/app'

describe('Signup routes', () => {
  test('should hit signup route', async () => {
    await request(app)
      .post('/api/signup')
      .expect(200)
  })
})
