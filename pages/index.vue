<template>
  <div>
    <div class="header">
      <img class="header-image" src="@/assets/header.png" />
    </div>
    <div class="container">
      <loading v-if="loading" />
      <div v-for="(report, index) in reports" :key="index" class="row">
        <div v-if="index % 2 === 0" class="column">
          <div class="report-left">
            <report :imageFileName="report.imageFileName" :title="report.title" :url="report.url" :tags="report.tags" />
          </div>
        </div>
        <div v-else class="column">
          <div class="report-right">
            <report :imageFileName="report.imageFileName" :title="report.title" :url="report.url" :tags="report.tags" />
          </div>
        </div>
      </div>
    </div>
    <add-report @click.native="showAddReportModal" />
    <add-report-modal v-on:close="hideAddReportModal"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import firebase from "firebase"
import { reportStore } from "@/store"
import { Report } from "@/store/types"
import addReport from '@/components/add-report.vue'
import addReportModal from '@/components/add-report-modal.vue'
import loading from '@/components/atoms/loading.vue'
import report from '@/components/report.vue'
import styledButton from '@/components/atoms/styled-button.vue'
import VModal from 'vue-js-modal'

Vue.use(VModal)

export default Vue.extend({
  components: {
    addReport,
    addReportModal,
    loading,
    report,
    styledButton
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
    showAddReportModal(): void {
      this.$modal.show('add-report')
    },
    hideAddReportModal(): void {
      this.$modal.hide('add-report')
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
.header {
  position: fixed;
  top: 0;
  height: 64px;
  width: 100%;
  background: #9A8584;
}

.header-image {
  height: 72px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.container {
  margin: 68px auto;
  max-width: 400px;
  align-items: center;
  text-align: center;
}

.column {
  float: left;
  width: 50%;
  margin-top: 12px;
}

.report-left {
  margin: 0 6px 0 12px;
}

.report-right {
  margin: 0 12px 0 6px;
}

</style>