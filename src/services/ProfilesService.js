import { AppState } from "../AppState"
import { Account } from "../models/Account"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class ProfilesService {
    async getProfileByProfileId(profileId) {
        const res = await api.get('/api/profiles/' + profileId)
        logger.log('[get profile]', res.data)
        AppState.activeProfile = new Account(res.data)
    }
}

export const profilesService = new ProfilesService()