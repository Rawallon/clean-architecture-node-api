import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log'
import { SignUpController } from '../../presentation/controllers/signup'
import { Controller } from '../../presentation/protocols/controller'
import { EmailValidatorAdapter } from '../../utils/EmailValidatorAdapter'
import { LogControllerDecorator } from '../decorator/log'

export const makeSignupController = (): Controller => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptSalt = 12
  const bcryptAdapter = new BcryptAdapter(bcryptSalt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const signUpController = new SignUpController(
    emailValidatorAdapter,
    dbAddAccount
  )
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
