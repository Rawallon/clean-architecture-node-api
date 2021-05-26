import { EmailValidatorAdapter } from './EmailValidatorAdapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}
describe('EmailValidator Adapter', () => {
  test('should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid-email@email.com')
    expect(isValid).toBe(false)
  })

  test('should return true if validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid('valid-email@email.com')
    expect(isValid).toBe(true)
  })

  test('should call validator with correct email', () => {
    const sut = makeSut()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('any-email@email.com')
    expect(isEmailSpy).toBeCalledWith('any-email@email.com')
  })
})
