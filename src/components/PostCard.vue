<template>
    <div class="col-12 rounded elevation-5 m-5 p-3 bg-light">

        <div class="d-flex">
            <router-link v-if="route.name == 'Home'" :to="{ name: 'Profile', params: { profileId: post.creatorId } }">
                <img v-if="post.creatorPicture" :src="post.creatorPicture" alt=""
                    class="rounded-circle poster-img mb-5 border-class">
            </router-link>
            <div>
                <h5 class="mt-3 ms-3">{{ post.creatorName }}</h5>
                <span class="ms-3">{{ post.createdAt }}</span>
            </div>
        </div>
        <h3 class="text-center">{{ post.body }}</h3>
        <div class="text-center"><img v-if="post.imgUrl" :src="post.imgUrl" alt="" class="post-img img-fluid"></div>
        <div class="d-flex justify-content-end">
            <h4 class="p-3"> likes: {{ post.likeIds.length }}</h4>
        </div>
        <div class="d-flex justify-content-end mt-3 me-4">
            <button v-if="post.creatorId == account.id" @click="removePost(post.id)"
                class="btn btn-danger rounded-pill">
                <i class="mdi mdi-delete m-3"></i>
            </button>
            <button class="btn " v-if="account.id" @click="likePost()">
                <i class="mdi mdi-heart-outline text-danger fs-1 selectable"></i>
            </button>
        </div>

    </div>

</template>

<script>
import { computed } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { Post } from '../models/Post';
import { postsService } from '../services/PostsService';
import Pop from '../utils/Pop';




export default {
    props: {
        post: {
            type: Object,
            required: true
        }
    },


    setup(props) {
        const route = useRoute()
        return {
            route,
            account: computed(() => AppState.account),
            async removePost() {
                try {
                    await postsService.removePost(props.post.id)
                } catch (error) {
                    console.error(error)
                    Pop.error((`You can't delete someone else's post!`), error.message)
                }
            },
            async likePost() {
                try {
                    await postsService.likePost(props.post.id)
                } catch (error) {
                    console.error(error)
                    Pop.error(('[ERROR]'), error.message)
                }
            }
        };

    }
}
</script>

<style lang="scss" scoped>
.poster-img {
    height: 10vh;
    width: 10vh;
}

.post-img {

    height: 40vh;
    width: 1500px;
}

.border-class {
    border: solid 10px white;
}

.translate {
    transform: translateY(-5vh);
}
</style>