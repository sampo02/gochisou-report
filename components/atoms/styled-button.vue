<template>
  <div>
    <button class="styled-button">{{ label }}</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  props: {
    label: String
  }
})
</script>

<style scoped>
.styled-button {
  width: 221px;
  height: 68px;
  text-align: center;
  background-color: #685F56;
  color: #ffffff;
  font-size: 1.2rem; 
  line-height: 68px;
  border-radius: 33px;
  box-shadow: 10px 10px 20px #685f56;
}
</style>