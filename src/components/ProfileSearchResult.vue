<template>
    <form @submit.prevent="searchPosts" class="rounded elevation-1">
        <div>
            <div class="d-flex">
                <input v-model="search.query" type="text" name="search" required class="form-control"
                    placeholder="search">
                <button class="btn btn-primary" type="submit">
                    <i class="mdi mdi-magnify-plus-outline f-18"></i>
                </button>
            </div>
        </div>
    </form>
</template>

<script>
import { reactive, ref } from 'vue';
import { postsService } from '../services/PostsService';
import Pop from '../utils/Pop';


export default {



    setup() {
        const search = reactive({
            query: ''
        })
        return {
            search,

            async searchPosts() {
                try {
                    await postsService.searchPosts(search)
                } catch (error) {
                    console.error(error)
                    Pop.error(('[ERROR]'), error.message)
                }
            }
        };

    }
}
</script>

<style>

</style>