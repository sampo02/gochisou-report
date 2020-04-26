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
    <add-report-modal @close="hideAddReportModal" />
    <edit-report-modal @close="hideEditReportModal" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import firebase from "firebase";
import { reportStore } from "@/store";
import { Report } from "@/store/types";
import addReport from "@/components/add-report.vue";
import addReportModal from "@/components/add-report-modal.vue";
import editReportModal from "@/components/edit-report-modal.vue";
import loading from "@/components/atoms/loading.vue";
import report from "@/components/report.vue";
import styledButton from "@/components/atoms/styled-button.vue";
import VModal from "vue-js-modal";

Vue.use(VModal, { dynamic: true, dynamicDefaults: { clickToClose: false } });

export type IndexData = {
  activeReport: Report | null;
};

export default Vue.extend({
  data(): IndexData {
    return {
      activeReport: null
    };
  },
  components: {
    addReport,
    addReportModal,
    editReportModal,
    loading,
    report,
    styledButton
  },
  created() {
    reportStore.fetch();
  },
  computed: {
    reports(): Report[] {
      return reportStore.reports;
    },
    loading(): boolean {
      return reportStore.loading;
    }
  },
  methods: {
    showAddReportModal(): void {
      this.$modal.show("add-report");
    },
    hideAddReportModal(): void {
      this.$modal.hide("add-report");
    },
    showEditReportModal(report: Report): void {
      this.activeReport = report;
      this.$modal.show("edit-report", { report: report });
    },
    hideEditReportModal(): void {
      this.$modal.hide("edit-report");
    },
    logout(): void {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/login");
        });
    }
  }
});
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