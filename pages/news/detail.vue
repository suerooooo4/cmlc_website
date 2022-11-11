<template>
  <div>
    <DNewsDetail v-if="$store.state.common.device_type == 'desktop'" />
    <MNewsDetail v-else />
  </div>
</template>

<script>
import DNewsDetail from '~/components/desktop/news/DNewsDetail.vue'
import MNewsDetail from '~/components/mobile/news/MNewsDetail.vue'

export default {
  name: 'NewsDetail',
  components: {
    DNewsDetail,
    MNewsDetail,
  },
}
</script>
