<template>
  <div>
    <button class="styled-button">{{ label }}</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    label: String,
  },
})
</script>

<style scoped>
.styled-button {
  width: 160px;
  height: 48px;
  text-align: center;
  background-color: #685f56;
  color: #ffffff;
  font-size: 1rem;
  border-radius: 32px;
}
</style>
