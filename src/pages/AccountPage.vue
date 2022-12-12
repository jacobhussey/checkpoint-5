<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-8">
        <form @submit.prevent="editAccount()">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input v-model="editable.name" type="text" required class="form-control" id="name">
          </div>
          <div class="mb-3">
            <label for="coverImg" class="form-label">coverImg</label>
            <input v-model="editable.coverImg" type="text" required class="form-control" id="coverImg">
          </div>
          <div class="mb-3">
            <label for="picture" class="form-label">picture</label>
            <input v-model="editable.picture" type="text" required class="form-control" id="picture">
          </div>
          <div class="mb-3">
            <label for="bio" class="form-label">Bio</label>
            <textarea v-model="editable.bio" required class="form-control" id="bio" rows="3"></textarea>
          </div>
          <div class="mb-3">
            <label for="bio" class="form-label">linkedIn</label>
            <textarea v-model="editable.linkedin" required class="form-control" id="bio" rows="3"></textarea>
          </div>
          <div class="mb-3">
            <label for="bio" class="form-label">Github</label>
            <textarea v-model="editable.github" required class="form-control" id="bio" rows="3"></textarea>
          </div>
          <div class="mb-3">
            <label for="bio" class="form-label">Resume</label>
            <textarea v-model="editable.resume" required class="form-control" id="bio" rows="3"></textarea>
          </div>
          <div class="mb-3">
            <label for="bio" class="form-label">Education Status</label>
            <textarea v-model="editable.graduated" required class="form-control" id="bio" rows="3"></textarea>
          </div>

          <button class="btn btn-success" type="submit">Edit Info</button>
        </form>
      </div>
    </div>
  </div>
  <div v-for="p in promos" class="row justify-content-center">
    <div class="col-6">
      <AdCard :promo="p" />
    </div>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { AppState } from '../AppState'
import AdCard from '../components/AdCard.vue'
import { accountService } from '../services/AccountService'
import Pop from '../utils/Pop'
export default {
  setup() {
    const editable = ref({});
    watchEffect(() => {
      if (AppState.account.id) {
        editable.value = { ...AppState.account };
      }
    });
    return {
      editable,
      account: computed(() => AppState.account),
      promos: computed(() => AppState.promos),

      async editAccount() {
        try {
          await accountService.editAccount(editable.value);
        }
        catch (error) {
          console.error(error);
          Pop.error(("[ERROR]"), error.message);
        }
      }
    };
  },
  components: { AdCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
