import bcrypt, { hash } from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return Promise.resolve('hashed-value')
  }
}))

const salt = 12
const makeSut = () => {
  const sut = new BcryptAdapter(salt)
  return sut
}

describe('Bcrypt Adapter', () => {
  test('should call Bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any-value')
    expect(hashSpy).toHaveBeenCalledWith('any-value', salt)
  })
  test('should return hash on success', async () => {
    const sut = makeSut()
    const hashedValue = await sut.encrypt('any-value')
    expect(hashedValue).toBe('hashed-value')
  })
  test('should throw if bcrypt throws', async () => {
    const sut = makeSut()
    jest
      .spyOn(bcrypt, 'hash')
      .mockImplementationOnce(() => Promise.reject(new Error()))
    const promise = sut.encrypt('any-value')
    await expect(promise).rejects.toThrow()
  })
})
