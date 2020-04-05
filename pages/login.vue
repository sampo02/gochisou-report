<template>
  <div class="container">
    <div v-if="!isLoading">
      <img src="@/assets/logo.png" />
      <div>
        <button @click="login">ログイン</button>
      </div>
    </div>
    <div v-else>
      <loading />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import firebase from "firebase"
import loading from '@/components/loading.vue'

interface LoginData {
  isLoading: boolean
}

export default Vue.extend({
  data(): LoginData {
    return {
      isLoading: false
    }
  },
  components: {
    loading
  },
  mounted() {
    if (window.location.hash === '#redirecting') {
      this.isLoading = true
    }
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.push('/')
      }
    })
  },
  methods: {
    login(): void {
      this.isLoading = true
      window.location.hash = 'redirecting'

      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    },
  }
})
</script>

<style scoped>
</style>
