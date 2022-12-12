<template>
  <div class="container-fluid">


    <div v-for="p in promos" class="row justify-content-center">
      <div class="col-12">
        <AdCard :promo="p" />
      </div>
    </div>


    <div>
      <PostForm />
    </div>

    <div class="row justify-content-center">
      <div v-for="p in posts" class="col-9 p-4">
        <PostCard :post="p" />
      </div>
    </div>

    <div class="row justify-content-between p-3">
      <div class="col-md-1">
        <button :disabled="!previousPage" @click="changePage(previousPage)" class="btn btn-primary w-100">
          Previous
        </button>
      </div>

      <div class="col-md-1">
        <button :disabled="!nextPage" @click="changePage(nextPage)" class="btn btn-primary w-100">
          Next
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { onMounted } from 'vue'
import { postsService } from '../services/PostsService'
import { AppState } from "../AppState"
import PostCard from '../components/PostCard.vue'
import Pop from '../utils/Pop'
import PostForm from '../components/PostForm.vue'
import AdCard from '../components/AdCard.vue'
import { promosService } from '../services/promosService.js'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()

    async function getPosts() {
      try {
        await postsService.getPosts();
      }
      catch (error) {
        console.error(error);
        Pop.error(("[ERROR]"), error.message);
      }
    }

    async function getPromotions() {
      try {
        await promosService.getPromotions()
      } catch (error) {
        console.error(error)
        Pop.error(('[ERROR]'), error.message)
      }
    }

    async function changePage(url) {
      try {
        await postsService.changePage(url)
      } catch (error) {
        console.error(error)
        Pop.error(('[ERROR]'), error.message)
      }
    }

    onMounted(() => {
      getPosts();
      getPromotions();
    });
    return {
      route,
      posts: computed(() => AppState.posts),
      promos: computed(() => AppState.promos),
      previousPage: computed(() => AppState.previousPage),
      nextPage: computed(() => AppState.nextPage),
      changePage,
    };
  },
  components: { PostCard, PostForm, AdCard }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
