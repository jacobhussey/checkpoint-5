import { AppState } from '../AppState'
import { Account } from '../models/Account'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async editAccount(body) {
    const res = await api.put('/account', body)
    logger.log('editing account', res.data)
    AppState.account = new Account(res.data)
  }
}

export const accountService = new AccountService()
