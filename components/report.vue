
<template>
  <div>
    <a :href="url" target="_blank">
      <img class="image" :src="imageUrl" />
    </a>
    <p class="title">{{ title }}</p>
    <p class="date">2020/4/10</p>
    <p class="tags">{{ tags }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  props: {
    imageUrl: String,
    title: String,
    url: String,
    tags: String
  }
})
</script>

<style scoped>
.image {
  width: 168px;
  height: 168px;
  border-radius: 16px;
}

p {
  text-align: left;
  margin: 0;
}

.title {
  font-size: 0.9rem;
  font-weight: bold;
  color: #685F56;
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