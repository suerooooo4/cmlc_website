<template>
  <div>
    <DActivityDetail v-if="$store.state.common.device_type == 'desktop'" />
    <MActivityDetail v-else />
  </div>
</template>

<script>
import DActivityDetail from '~/components/desktop/activity/DActivityDetail.vue'
import MActivityDetail from '~/components/mobile/activity/MActivityDetail.vue'

export default {
  name: 'ActivityDetail',
  components: {
    DActivityDetail,
    MActivityDetail,
  },
}
</script>
