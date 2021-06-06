<template>
  <div>
    <modal name="search-reports" :width="340" :height="220">
      <div class="header">
        <img
          class="cancel-icon"
          src="@/assets/icon_cancel.png"
          @click="close"
        />
      </div>
      <div class="body">
        <form @submit.prevent="onSubmit">
          <div class="input-text">
            <label class="label" for="title">検索タグ</label>
            <input class="input" id="title" v-model="searchQuery" />
          </div>
          <div class="submit">
            <styled-button label="しぼりこむ" />
          </div>
        </form>
      </div>
    </modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import styledButton from '@/components/atoms/styled-button.vue'

interface SearchReportsModalData {
  searchQuery: string
}

export default Vue.extend({
  data(): SearchReportsModalData {
    return {
      searchQuery: '',
    }
  },
  components: {
    styledButton,
  },
  methods: {
    close(): void {
      this.$emit('close')
    },
    onSubmit(e: any): void {
      this.$emit('searchReports', this.searchQuery)
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

.input {
  font-size: 0.8rem;
  border-radius: 8px;
  width: 200px;
  height: 24px;
  padding: 4px 12px;
  background-color: #e6e0d9;
  outline-width: 0;
  border: none;
}

input,
label {
  display: block;
}

.submit {
  margin-top: 20px;
}
</style>
