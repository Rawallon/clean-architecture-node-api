import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helper/mongo-helper'
import app from '../config/app'

describe('Signup routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('should hit signup route', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Wallon',
        email: 'rawallon@gmail.com',
        password: '123123',
        confirmPassword: '123123'
      })
      .expect(200)
  })
})
