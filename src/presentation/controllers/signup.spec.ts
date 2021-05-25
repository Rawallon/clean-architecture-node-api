import { InvalidParamError } from '../errors/invalid-param-errors'
import { MissingParamError } from '../errors/missing-param-errors'
import { ServerError } from '../errors/server-error'
import { EmailValidator } from '../protocols/email-validator'
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
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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
  test('should return 400 if an invalid emails is provided', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'any-name',
        email: 'invalid-email@email.com',
        password: 'any-password',
        confirmPassword: 'any-password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })
  test('should call EmailValidator with provided email', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        name: 'any-name',
        email: 'invalid-email@email.com',
        password: 'any-password',
        confirmPassword: 'any-password'
      }
    }
    sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email)
  })
  test('should return 500 if EmailValidator throw', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        name: 'any-name',
        email: 'any-email@email.com',
        password: 'any-password',
        confirmPassword: 'any-password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
