
<template>
  <div>
    <div class="report">
      <a :href="url" target="_blank">
        <img v-if="imageUrl" class="image" :src="imageUrl" />
      </a>
      <p class="title">{{ title }}</p>
      <p class="date">2020/4/10</p>
      <p class="tags">{{ tags }}</p>
      <img @click="edit" class="icon" src="@/assets/icon_edit.png" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import firebase from "firebase"

export type ReportData = {
  imageUrl: string
}

export default Vue.extend({
  data(): ReportData {
    return {
      imageUrl: ''
    }
  },
  props: {
    imageFileName: String,
    title: String,
    url: String,
    tags: String
  },
  created() {
    const storage = firebase.storage();
    const gsReference = storage.refFromURL(`gs://${process.env.storageBucket}/images/${this.imageFileName}`);
    gsReference.getDownloadURL().then(url => {
      this.imageUrl = url
    })
  },
  methods: {
    edit(): void {
      this.$emit("edit")
    }
  }
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
  object-fit: cover
}

p {
  text-align: left;
  margin: 0;
}

.title {
  font-size: 0.9rem;
  font-weight: bold;
  color: #685F56;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.date {
  font-size: 0.6rem;
  color: #9A8584;
}

.tags {
  font-size: 0.6rem;
  color: #9A8584;
}

</style>