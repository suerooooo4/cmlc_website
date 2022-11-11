<template>
  <div>
    <DNewsActivity v-if="$store.state.common.device_type == 'desktop'" />
    <MNewsActivity v-else />
  </div>
</template>

<script>
import DNewsActivity from '~/components/desktop/news-activity/DNewsActivity.vue'
import MNewsActivity from '~/components/mobile/news-activity/MNewsActivity.vue'

export default {
  name: 'NewsActivity',
  components: {
    DNewsActivity,
    MNewsActivity,
  },
}
</script>
