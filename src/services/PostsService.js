import { propsToAttrMap } from "@vue/shared"
import { createApp } from "vue"
import { AppState } from "../AppState"
import { Post } from "../models/Post"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class PostsService {
    async getPosts() {
        const res = await api.get('/api/posts')
        logger.log('getting posts', res.data.posts)
        AppState.posts = res.data.posts.map(p => new Post(p))
        // AppState.totalPages = res.data.totalPages
        AppState.previousPage = res.data.newer
        AppState.nextPage = res.data.older
    }

    async getPostsByCreatorId(profileId) {
        // /api/profiles/:id/posts
        const res = await api.get(`/api/profiles/${profileId}/posts`)
        logger.log('getting posts by creator id', res.data)
        AppState.posts = res.data.posts.map(p => new Post(p))
        AppState.totalProfilePages = res.data.totalPages
        AppState.previousPage = res.data.newer
        AppState.nextPage = res.data.older
    }


    async createPost(postData) {
        const res = await api.post('/api/posts', postData)
        logger.log('createdpost', res.data)
        AppState.posts.unshift(new Post(res.data))
    }

    async likePost(id) {
        const res = await api.post(`/api/posts/${id}/like`)
        logger.log('liking post', res.data)
        const i = AppState.posts.findIndex(p => p.id == id)
        AppState.posts.splice(i, 1, new Post(res.data))
        AppState.posts = [...AppState.posts]

    }

    async removePost(id) {
        const res = await api.delete('/api/posts/' + id)
        logger.log('DELETED POST', res.data)
        AppState.posts.splice(AppState.posts.findIndex(p => p.id == id), 1)
        // let index = AppState.posts.findIndex(p => p.id == id)
        // if (index >= 0) {
        //     AppState.splice(index, 1)
        // }
        // FIXME why doesn't this work? ^
    }

    async searchPosts(search) {
        const res = await api.get('/api/posts?=query', { params: search })
        AppState.posts = res.data.posts.map(p => new Post(p))
        logger.log(res.data, 'getting search')
        AppState.previousPage = res.data.newer
        AppState.nextPage = res.data.older

    }

    async changePage(url) {
        const res = await api.get(url)
        logger.log(res.data)
        AppState.posts = res.data.posts.map(p => new Post(p))
        AppState.previousPage = res.data.newer
        AppState.nextPage = res.data.older

    }
}

export const postsService = new PostsService()