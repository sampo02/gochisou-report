<template>
  <div>
    <div class="header">
      <img class="header-image" src="@/assets/header.png" />
    </div>
    <div @scroll="handleScroll()" class="container">
      <loading v-if="loading" />
      <div v-for="(report, index) in reports" :key="report.id" class="row">
        <div v-if="index % 2 === 0" class="column">
          <div class="report-left">
            <report @edit="showEditReportModal(report)" :report="report" />
          </div>
        </div>
        <div v-else class="column">
          <div class="report-right">
            <report @edit="showEditReportModal(report)" :report="report" />
          </div>
        </div>
      </div>
    </div>
    <add-report @click.native="showAddReportModal" />
    <add-report-modal
      @close="hideAddReportModal"
      @createReport="createReport"
    />
    <edit-report-modal
      @close="hideEditReportModal"
      @updateReport="updateReport"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import firebase from 'firebase'
import { firestore } from 'firebase'
import { db } from '@/plugins/db'
import { NewReport, Report, UpdatedReport } from '@/types'
import addReport from '@/components/add-report.vue'
import addReportModal from '@/components/add-report-modal.vue'
import editReportModal from '@/components/edit-report-modal.vue'
import loading from '@/components/atoms/loading.vue'
import report from '@/components/report.vue'
import styledButton from '@/components/atoms/styled-button.vue'
import VModal from 'vue-js-modal'

Vue.use(VModal, { dynamic: true, dynamicDefaults: { clickToClose: false } })

export type IndexData = {
  activeReport: Report | null
  reports: Report[]
  loading: boolean
  lastVisibleReport: firestore.QueryDocumentSnapshot<firestore.DocumentData> | null
}

export default Vue.extend({
  data(): IndexData {
    return {
      activeReport: null,
      reports: [],
      loading: false,
      lastVisibleReport: null,
    }
  },
  components: {
    addReport,
    addReportModal,
    editReportModal,
    loading,
    report,
    styledButton,
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  created() {
    this.fetch()
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    fetch(): void {
      this.loading = true
      if (this.lastVisibleReport === null) {
        db.collection('reports')
          .orderBy('createdAt', 'desc')
          .limit(20)
          .get()
          .then((querySnapshot) => {
            this.setReports(querySnapshot)
          })
      } else {
        db.collection('reports')
          .orderBy('createdAt', 'desc')
          .startAfter(this.lastVisibleReport)
          .limit(20)
          .get()
          .then((querySnapshot) => {
            this.setReports(querySnapshot)
          })
      }
      this.loading = false
    },
    setReports(
      querySnapshot: firestore.QuerySnapshot<firestore.DocumentData>
    ): void {
      const documents = querySnapshot.docs.map((doc) =>
        Object.assign({ id: doc.id }, { ...doc.data() })
      )
      documents.map((report: any) => {
        const storage = firebase.storage()
        const gsReference = storage.refFromURL(
          `gs://${process.env.storageBucket}/images/${report.imageFileName}`
        )
        const url = gsReference.getDownloadURL().then((url) => {
          return url
        })
        this.reports.push({ imageUrl: Promise.resolve(url), ...report })
      })
      this.lastVisibleReport = querySnapshot.docs[documents.length - 1]
    },
    showAddReportModal(): void {
      this.$modal.show('add-report')
    },
    hideAddReportModal(): void {
      this.$modal.hide('add-report')
    },
    async createReport(newReport: NewReport): Promise<void> {
      await db.collection('reports').add({
        imageFileName: newReport.imageFileName,
        title: newReport.title,
        url: newReport.url,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        tags: newReport.tags,
      })
      const storageRef = firebase.storage().ref()
      const imageRef = storageRef.child(`images/${newReport.imageFileName}`)
      await imageRef.put(newReport.imageFile)
      this.fetch()
      this.$modal.hide('add-report')
    },
    showEditReportModal(report: Report): void {
      this.activeReport = report
      this.$modal.show('edit-report', { report: report })
    },
    hideEditReportModal(): void {
      this.$modal.hide('edit-report')
    },
    async updateReport(updatedReport: UpdatedReport): Promise<void> {
      await db.collection('reports').doc(updatedReport.id).update({
        title: updatedReport.title,
        url: updatedReport.url,
        tags: updatedReport.tags,
      })
      this.fetch()
      this.$modal.hide('edit-report')
    },
    handleScroll() {
      if (
        document.documentElement.scrollTop +
          document.documentElement.clientHeight >=
        document.documentElement.scrollHeight
      ) {
        this.fetch()
      }
    },
    logout(): void {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push('/login')
        })
    },
  },
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  height: 64px;
  width: 100%;
  background: #9a8584;
  z-index: 1;
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
