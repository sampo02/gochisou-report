<template>
  <div>
    <div class="report">
      <a :href="report.url" target="_blank">
        <img v-if="imageUrl" class="image" :src="imageUrl" />
        <div v-else class="loading">
          <img class="loading-image" src="@/assets/logo.png" />
        </div>
      </a>
      <p class="title">{{ report.title }}</p>
      <p class="date">{{ date }}</p>
      <p class="tags">
        <span v-for="(tag, i) in report.tags" :key="i">
          {{ tag }}
        </span>
      </p>
      <img @click="edit" class="icon" src="@/assets/icon_edit.png" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import moment from 'moment'
import { Report } from '@/types'

export type ReportData = {
  imageUrl: string
  date: string
}

export default Vue.extend({
  data(): ReportData {
    return {
      imageUrl: '',
      date: '',
    }
  },
  props: {
    report: Object as PropType<Report>,
  },
  created() {
    this.report.imageUrl.then((url: string) => {
      this.imageUrl = url
    })

    this.date = moment(this.report.createdAt.toDate()).format('YYYY/MM/DD')
  },
  methods: {
    edit(): void {
      this.$emit('edit')
    },
  },
})
</script>

<style scoped>
.report {
  position: relative;
}
.icon {
  position: absolute;
  height: 20px;
  width: 20px;
  margin: 12px;
  top: 0;
  right: 0;
  cursor: pointer;
}
.image {
  width: 100%;
  height: 180px;
  border-radius: 16px;
  object-fit: cover;
}

.loading {
  height: 180px;
  text-align: center;
  vertical-align: middle;
  display: table-cell;
}

.loading-image {
  height: 52px;
  display: block;
  margin: auto;
}

p {
  text-align: left;
  margin: 0;
}

.title {
  font-size: 0.9rem;
  font-weight: bold;
  color: #685f56;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.date {
  font-size: 0.6rem;
  color: #9a8584;
}

.tags {
  font-size: 0.6rem;
  color: #9a8584;
}
</style>
