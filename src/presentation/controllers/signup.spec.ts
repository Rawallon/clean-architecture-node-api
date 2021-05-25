import { MissingParamError } from '../errors/missing-param-errors'
import { SignUpController } from './signup'

const EmailValidatorMock = (): any => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}
const makeSut = (): any => {
  const emailValidatorStub = EmailValidatorMock()
  const sut = new SignUpController(emailValidatorStub)
  return { sut, emailValidatorStub }
}

describe('Signup Controller', () => {
  test('should return 400 if no name is provided', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        // name: 'any-name',
        email: 'any-email@email.com',
        password: 'any-password',
        confirmPassword: 'any-password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })
  test('should return 400 if no emails is provided', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        name: 'any-name',
        // email: 'any-email@email.com',
        password: 'any-password',
        confirmPassword: 'any-password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
  test('should return 400 if no password is provided', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        name: 'any-name',
        email: 'any-email@email.com',
        // password: 'any-password',
        confirmPassword: 'any-password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })
  test('should return 400 if no password confirmation is provided', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        name: 'any-name',
        email: 'any-email@email.com',
        password: 'any-password'
        // confirmPassword: 'any-password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('confirmPassword'))
  })
})
