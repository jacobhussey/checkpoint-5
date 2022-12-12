import { AppState } from "../AppState"
import { Promo } from "../models/Promo"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class PromosService {

    async getPromotions() {
        const res = await api.get('/api/ads')
        logger.log('getting ads', res.data)
        AppState.promos = res.data.map(p => new Promo(p))
        // logger.log('appstate data', AppState.promos)
    }
}

export const promosService = new PromosService()