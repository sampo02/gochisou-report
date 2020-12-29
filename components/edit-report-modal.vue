<template>
  <div>
    <modal
      @before-open="beforeOpen"
      name="edit-report"
      :width="340"
      :height="560"
    >
      <div class="header">
        <img
          class="cancel-icon"
          src="@/assets/icon_cancel.png"
          @click="close"
        />
      </div>
      <div class="body">
        <form @submit.prevent="onSubmit">
          <a :href="this.url" target="_blank">
            <img class="preview" :src="imageUrl" />
          </a>
          <div class="input-text">
            <label class="label" for="title">ごちそうタイトル</label>
            <input class="input" id="title" v-model="title" />
          </div>
          <div class="input-text">
            <label class="label" for="url">リンク</label>
            <input class="input" id="url" v-model="url" />
          </div>
          <div class="input-text">
            <label class="label">投稿日</label>
            <label class="report-date">{{ this.createdAt }}</label>
          </div>
          <div class="input-text">
            <label class="label" for="tags">タグ</label>
            <input class="input" id="tags" v-model="tags" />
          </div>
          <div class="submit-report">
            <styled-button label="ごちレポする" />
          </div>
        </form>
      </div>
    </modal>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import moment from 'moment'
import { Report, UpdatedReport } from '@/types'
import styledButton from '@/components/atoms/styled-button.vue'
import { v4 as uuidv4 } from 'uuid'

export type EditReportModalData = {
  id: string
  title: string
  imageUrl: string
  url: string
  createdAt: string
  tags: string
}

export default Vue.extend({
  data(): EditReportModalData {
    return {
      id: '',
      title: '',
      imageUrl: '',
      url: '',
      createdAt: '',
      tags: '',
    }
  },
  props: {
    report: Object as PropType<Report>,
  },
  components: {
    styledButton,
  },
  methods: {
    beforeOpen(event: any): void {
      const report: Report = event.params.report
      this.id = report.id
      report.imageUrl.then((url: string) => {
        this.imageUrl = url
      })
      this.title = report.title
      this.url = report.url
      this.createdAt = moment(report.createdAt.toDate()).format('YYYY/MM/DD')
      this.tags = report.tags
    },
    close(): void {
      this.$emit('close')
    },
    setImageUrl(): void {
      this.report.imageUrl.then((url: string) => {
        this.imageUrl = url
      })
    },
    date(): string {
      return moment(new Date()).format('YYYY/MM/DD')
    },
    onSubmit(e: any): void {
      const updatedReport: UpdatedReport = {
        id: this.id,
        title: this.title,
        url: this.url,
        tags: this.tags,
      }
      this.clear()
      this.$emit('updateReport', updatedReport)
    },
    clear(): void {
      this.title = ''
      this.url = ''
      this.createdAt = ''
      this.tags = ''
    },
  },
})
</script>

<style scoped>
.header {
  position: absolute;
  right: 0;
}

.cancel-icon {
  height: 28px;
  width: 28px;
  margin: 12px;
}

.preview {
  height: 180px;
  width: 180px;
  border-radius: 16px;
}

.body {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

form {
  margin: 0 auto;
  width: 220px;
}

.label {
  font-size: 0.6rem;
  font-weight: bold;
  margin-top: 12px;
  text-align: left;
  color: #9a8584;
}

.report-date {
  text-align: left;
  color: #e6e0d9;
}

.input {
  font-size: 0.8rem;
  border-radius: 8px;
  width: 200px;
  height: 24px;
  padding: 4px 12px;
  background-color: #e6e0d9;
  outline-width: 0;
  border-style: solid;
  border: none;
}

input,
label {
  display: block;
}

.submit-report {
  margin-top: 20px;
}
</style>
