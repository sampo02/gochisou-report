<template>
  <div class="container">
    <img src="@/assets/logo.png" />
    <loading v-if="loading" />
    <div v-for="report in reports" :key="report.url">
      <a :href="report.url" target="_blank">{{ report.url }}</a>
    </div>
    <form @submit.prevent="onSubmit">
      <input v-model="url" placeholder="リンク">
      <input type="submit" value="ごちレポする">
    </form>
    <button @click="logout">ログアウト</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import firebase from "firebase"
import { reportStore } from "@/store"
import { Report } from "@/store/types"
import loading from '@/components/atoms/loading.vue'

export type ReportData = {
  url: string
}

export default Vue.extend({
  data(): ReportData {
    return {
      url: ''
    }
  },
  components: {
    loading
  },
  created() {
    reportStore.fetch()
  },
  computed: {
    reports(): Report[] {
      return reportStore.reports
    },
    loading(): boolean {
      return reportStore.loading
    }
  },
  methods: {
    onSubmit(): void {
      reportStore.create(this.url)
    },
    logout(): void {
      firebase.auth().signOut().then(() => {
        this.$router.push('/login')
      })
    },
  }
})
</script>

<style scoped>
</style>