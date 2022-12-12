<template>
    <!-- <a :href="promo.linkUrl"> -->
    <div class="col-12 justify-content-center py-3">

        <img :src="promo.banner" alt="" class="">
    </div>
    <div class="pb-3"></div>
    <!-- </a> -->
</template>

<script>
import { promosService } from '../services/promosService.js'
import { onMounted } from 'vue'
import Pop from '../utils/Pop'
import { computed } from '@vue/reactivity'
import { AppState } from "../AppState"

export default {
    // props: {
    //     promotion: {
    //         type: Object,
    //         required: true
    //     }
    // },
    props: {
        promo: {
            type: Object,
            required: true
        }
    },


    setup() {

        onMounted(() => {

        })
        return {
            // promos: computed(() => AppState.promos)
        };

    }
}
</script>

<style lang="scss" scoped>
// .banner {
//     height: 30vh;
//     width: 50vw;
// }
</style>