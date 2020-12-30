<template>
  <div>
    <modal name="add-report" :width="340" :height="560">
      <div class="header">
        <img
          class="cancel-icon"
          src="@/assets/icon_cancel.png"
          @click="close"
        />
      </div>
      <div class="body">
        <form @submit.prevent="onSubmit">
          <img v-if="previewUrl" class="preview" :src="previewUrl" />
          <div v-else class="preview-input-container">
            <label for="preview">
              <img class="camera-icon" src="@/assets/icon_camera.png" />
            </label>
            <input
              type="file"
              accept="image/*"
              class="preview-input"
              id="preview"
              @change="onPreviewImageChange"
            />
          </div>
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
            <label class="report-date">{{ this.date() }}</label>
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
import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/firestore'
import moment from 'moment'
import { NewReport, Report } from '@/types'
import styledButton from '@/components/atoms/styled-button.vue'
import { v4 as uuidv4 } from 'uuid'

export type ReportData = {
  previewUrl: string
  imageFile: Blob | null
  imageFileName: string
  title: string
  url: string
  createdAt: string
  tags: string
}

export default Vue.extend({
  data(): ReportData {
    return {
      previewUrl: '',
      imageFile: null,
      imageFileName: '',
      title: '',
      url: '',
      createdAt: '',
      tags: '',
    }
  },
  components: {
    styledButton,
  },
  methods: {
    close(): void {
      this.$emit('close')
    },
    onPreviewImageChange(e: any): void {
      const file = e.target.files[0]
      const rawExtention: string = file.type
      this.previewUrl = URL.createObjectURL(file)
      this.imageFile = file
      this.imageFileName = `${uuidv4()}.${rawExtention.split('/')[1]}`
    },
    date(): string {
      return moment(new Date()).format('YYYY/MM/DD')
    },
    onSubmit(e: any): void {
      if (this.imageFile === null) {
        return
      }
      const newReport: NewReport = {
        imageFile: this.imageFile,
        imageFileName: this.imageFileName,
        title: this.title,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        url: this.url,
        tags: this.tags.replaceAll('　', ' ').split(' '),
      }
      this.clear()
      this.$emit('createReport', newReport)
    },
    clear(): void {
      this.previewUrl = ''
      this.imageFile = null
      this.imageFileName = ''
      this.title = ''
      this.url = ''
      this.createdAt = ''
      this.tags = ''
    },
  },
})
</script>

<style>
.v--modal-box {
  -webkit-border-radius: 16px !important;
  -moz-border-radius: 16px !important;
  border-radius: 16px !important;
}
</style>

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

.preview-input {
  display: none;
}

.camera-icon {
  height: 48px;
  width: 48px;
}

.preview-input-container {
  position: relative;
  height: 180px;
  width: 180px;
  border-radius: 16px;
  background: #9a8584;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.preview {
  height: 180px;
  width: 180px;
  border-radius: 16px;
  object-fit: cover;
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
