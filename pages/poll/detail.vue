<template>
  <div>
    <DPollDetail v-if="$store.state.common.device_type == 'desktop'" />
    <MPollDetail v-else />
  </div>
</template>

<script>
import DPollDetail from '~/components/desktop/poll/DPollDetail.vue'
import MPollDetail from '~/components/mobile/poll/MPollDetail.vue'

export default {
  name: 'PollDetail',
  components: {
    DPollDetail,
    MPollDetail,
  },
}
</script>
