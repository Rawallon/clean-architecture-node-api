import { MongoHelper } from '../helper/mongo-helper'
import { AccountMongoRepository } from './account'

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  const makeSut = (): AccountMongoRepository => {
    const sut = new AccountMongoRepository()
    return sut
  }
  test('should return an account on success', async () => {
    const sut = makeSut()
    const account = await sut.add({
      name: 'valid-name',
      email: 'valid-email',
      password: 'valid-password'
    })
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('valid-name')
    expect(account.email).toBe('valid-email')
    expect(account.password).toBe('valid-password')
  })
})
