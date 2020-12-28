<template>
  <div class="container">
    <div v-if="!isLoading">
      <img class="logo" src="@/assets/logo.png" />
      <div>
        <styled-button
          class="login-button"
          label="ログイン"
          @click.native="login"
        />
      </div>
    </div>
    <div v-else>
      <loading />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import loading from '@/components/atoms/loading.vue'
import styledButton from '@/components/atoms/styled-button.vue'

interface LoginData {
  isLoading: boolean
}

export default Vue.extend({
  data(): LoginData {
    return {
      isLoading: false,
    }
  },
  components: {
    loading,
    styledButton,
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
  },
})
</script>

<style scoped>
.container {
  display: flex;
  min-height: 90vh;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.logo {
  height: 256px;
  width: 256px;
  padding-left: 56px;
  margin-bottom: 48px;
}
</style>
