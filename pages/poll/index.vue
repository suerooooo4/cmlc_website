<template>
  <div>
    <DPoll v-if="$store.state.common.device_type == 'desktop'" />
    <MPoll v-else />
  </div>
</template>

<script>
import DPoll from '~/components/desktop/poll/DPoll.vue'
import MPoll from '~/components/mobile/poll/MPoll.vue'

export default {
  name: 'Poll',
  components: {
    DPoll,
    MPoll,
  },
}
</script>
