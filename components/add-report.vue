<template>
  <div>
    <div class="container">
      <div class="background">
        <img class="icon" src="@/assets/icon_plus.png" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    url: String
  }
});
</script>

<style scoped>
.container {
  position: fixed;
  bottom: 0;
  height: 64px;
  width: 100%;
  margin-bottom: 12px;
}

.background {
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background: #9a8584;
  background: #685f56;
  margin-left: auto;
  margin-right: auto;
}

.icon {
  height: 60px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>