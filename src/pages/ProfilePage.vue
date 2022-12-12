<template>
    <div class="container-fluid">

        <!-- SECTION PROFILE INFO -->
        <section class="row justify-content-center">
            <div class="col-10 bg-white pt-4 mt-5">
                <div class="d-flex justify-content-center">
                    <img :src="profile?.coverImg" alt="" class="cover-img ">
                </div>
                <div class="d-flex">
                    <img :src="profile?.picture" alt="" class="rounded-circle creator-img p-3 translate border-class">
                    <div v-if="profile?.graduated == true">
                        <i class="mdi mdi-check-bold text-success fs-1"></i>
                    </div>
                    <div v-else>
                        <i class="mdi mdi-close-circle-outline fs-1 text-danger"></i>
                    </div>
                    <h1 class="translate-down p-5">{{ profile?.name }} <span class="">
                            <h4>{{ profile?.bio }}</h4>
                        </span></h1>
                </div>
                <div class="d-flex justify-content-end">
                    <a v-if="profile?.github" :href="profile?.github"
                        class="mdi mdi-github mdi-48px ms-3 text-dark"></a>
                    <a v-if="profile?.linkedin" :href="profile?.linkedin" class="mdi mdi-linkedin mdi-48px ms-3"></a>
                    <a v-if="profile?.resume" :href="profile?.resume"
                        class="mdi mdi-file-document mdi-48px ms-3 text-success"></a>
                </div>
            </div>
        </section>

        <!-- SECTION POSTS -->
        <section class="row justify-content-center">
            <div v-for="p in posts" class="col-8 elevation-5 p-3 m-5 bg-light">
                <div class="d-flex"><img :src="profile?.picture" alt=""
                        class="rounded-circle poster-img mb-5 border-class1">
                    <div>
                        <h5 class="mt-3 ms-3">{{ profile?.name }}</h5>
                        <span class="ms-3">{{ p.createdAt }}</span>
                    </div>
                </div>
                <h3 class="text-center">{{ p.body }}</h3>
                <div class="text-center"><img v-if="p.imgUrl" :src="p.imgUrl" alt="" class="post-img img-fluid"></div>
                <div class="d-flex justify-content-end">
                    <h4> likes: {{ p.likeIds.length }}</h4>
                </div>
                <div class="d-flex justify-content-end mt-3 me-4">
                    <button class="btn" v-if="account.id" @click="likePost(p.id)">
                        <i class="mdi mdi-heart-outline text-danger fs-1 selectable"></i>
                    </button>
                </div>
            </div>
        </section>
        <!-- SECTION AD CARD -->
        <div v-for="p in promos" class="row justify-content-center">
            <div class="col-6">
                <AdCard :promo="p" />
            </div>
        </div>

        <!-- SECTION PAGE BUTTONS -->
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

import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import AdCard from '../components/AdCard.vue';
import { postsService } from '../services/PostsService';
import { profilesService } from '../services/ProfilesService.js';
import Pop from '../utils/Pop';
export default {
    // props: {
    //     post: {
    //         type: Object,
    //         required: true
    //     }
    // },
    setup() {
        const route = useRoute();

        async function likePost(id) {
            try {
                await postsService.likePost(id)
            } catch (error) {
                console.error(error)
                Pop.error(('[ERROR]'), error.message)
            }
        }
        async function getProfileByProfileId() {
            try {
                await profilesService.getProfileByProfileId(route.params.profileId);
            }
            catch (error) {
                console.error(error);
                Pop.error(("[ERROR]"), error.message);
            }
        }

        async function getPostsByCreatorId() {
            try {
                await postsService.getPostsByCreatorId(route.params.profileId);
            }
            catch (error) {
                console.error(error);
                Pop.error(("[ERROR]"), error.message);
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
            getProfileByProfileId(),
                getPostsByCreatorId();
        });
        return {
            profile: computed(() => AppState.activeProfile),
            posts: computed(() => AppState.posts),
            account: computed(() => AppState.account),
            promos: computed(() => AppState.promos),
            previousPage: computed(() => AppState.previousPage),
            nextPage: computed(() => AppState.nextPage),
            changePage,
            likePost
        };
    },
    components: { AdCard }
}
</script>

<style lang="scss" scoped>
.creator-img {
    height: 30vh;
    width: 30vh;

}

.cover-img {
    height: 40vh;
    width: 1500px
}


.poster-img {
    height: 10vh;
    width: 10vh;
}

.post-img {

    height: 40vh;
    width: 1500px;
}

// .translate-down {
//     transform: translateY(5vh);
// }

.translate {
    transform: translateY(-5vh);
}

.border-class {
    border: solid 1px black;
    background-color: white;
}

.border-class1 {
    border: solid 10px white;
    background-color: black;
}
</style>