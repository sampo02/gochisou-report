
<template>
  <div>
    <modal name="add-report" :width="340" :height="600">
      <div class="header">
        <img class="cancel-icon" src="@/assets/icon_cancel.png" @click="close" />
      </div>
      <div class="body">
        <form @submit.prevent="onSubmit">
          <div class="input-text">
            <label class="label" for="image">ごちそう画像リンク</label>
            <input class="input" id="image" v-model="imageUrl" />
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
            <label class="report-date">2020/4/11</label>
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
import Vue from "vue"
import { Report } from "@/store/types"
import { reportStore } from "@/store"
import styledButton from '@/components/atoms/styled-button.vue'

export type ReportData = {
  imageUrl: string
  title: string
  url: string
  createdAt: string
  tags: string
}

export default Vue.extend({
  data(): ReportData {
    return {
      imageUrl: '',
      title: '',
      url: '',
      createdAt: '',
      tags: ''
    }
  },
  components: {
    styledButton
  },
  methods: {
    close(): void {
      this.$emit("close")
    },
    onSubmit(): void {
      reportStore.create({ imageUrl: this.imageUrl, title: this.title, url: this.url, tags: this.tags })
      this.$emit("close")
    },
  }
})
</script>

<style>
.v--modal-box {
  -webkit-border-radius: 16px;
  -moz-border-radius: 16px;
  border-radius: 16px; 
}
</style>

<style scoped>

.header {
  position: absolute;
  right: 0;
}

.cancel-icon {
  width: 28px;
  height: 28px;
  margin: 12px;
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
  color: #9A8584;
}

.report-date {
  text-align: left;
  color: #E6E0D9;
}

.input {
  font-size: 0.8rem;
  border-radius: 8px;
  width: 200px; 
  height: 24px;
  padding: 4px;
  background-color: #E6E0D9;
  outline-width: 0;
}

input, label {
  display: block;
}

.submit-report {
  margin-top: 20px;
}

</style>