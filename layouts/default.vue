<template>
  <div>
    <nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'DefaultLayout',
})
</script>

<style>
@font-face {
  font-family: 'SawarabiGothic-Regular';
  src: url('../assets/SawarabiGothic-Regular.ttf');
  font-weight: normal;
  font-style: normal;
}

body {
  font-family: 'SawarabiGothic-Regular';
  margin: 0;
}
</style>
