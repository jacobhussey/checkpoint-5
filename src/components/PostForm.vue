<template>
    <form v-if="account.id" @submit.prevent="createPost()">

        <h1 class="text-center mt-3"> Create Post</h1>

        <div class="d-flex justify-content-center mt-5">
            <input v-model="editable.imgUrl" type="url" placeholder="insert img url here" class="rounded">
        </div>
        <div class="mb-3 d-flex justify-content-center">
            <textarea v-model="editable.body" name="" id="" cols="110" rows="10" class="mt-3 rounded"
                placeholder="Write post here..."></textarea>
            <div id="" class="form-text"></div>
            <div class="d-flex align-items-end ms-3"><button type="submit" class="btn btn-dark"><i
                        class="mdi mdi-plus fs-1 text-success"></i></button>
            </div>
        </div>
    </form>
</template>
2
<script>
import { computed } from '@vue/reactivity'
import { ref } from 'vue'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'


export default {



    setup() {

        const editable = ref({})
        return {
            account: computed(() => AppState.account),
            editable,
            async createPost() {
                try {
                    await postsService.createPost(editable.value)
                    Pop.toast('created post', 'success')
                } catch (error) {
                    Pop.error(error)
                    logger.error(error)
                }
            }
        };

    }
}
</script>

<style>

</style>