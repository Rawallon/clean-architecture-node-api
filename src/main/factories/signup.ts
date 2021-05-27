import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { SignUpController } from '../../presentation/controllers/signup'
import { EmailValidatorAdapter } from '../../utils/EmailValidatorAdapter'

export const makeSignupController = (): SignUpController => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptSalt = 12
  const bcryptAdapter = new BcryptAdapter(bcryptSalt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const signUpController = new SignUpController(
    emailValidatorAdapter,
    dbAddAccount
  )
  return signUpController
}
