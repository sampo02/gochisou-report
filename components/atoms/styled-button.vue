<template>
  <div>
    <button class="styled-button">{{ label }}</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    label: String
  }
})
</script>

<style scoped>
.styled-button {
  width: 160px;
  height: 48px;
  text-align: center;
  background-color: #685F56;
  color: #FFFFFF;
  font-size: 1.0rem; 
  border-radius: 32px;
}
</style>