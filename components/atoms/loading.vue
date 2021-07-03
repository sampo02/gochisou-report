<script lang="tsx">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  setup() {
    const loadingIcon = require('../../assets/loading.gif')
    return () => (
      <div>
        <img class="loading" src={loadingIcon} alt="loading" />
      </div>
    )
  },
})
</script>

<style scoped>
.loading {
  height: 80px;
  width: 80px;
}
</style>
