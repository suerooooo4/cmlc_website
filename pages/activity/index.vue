<template>
  <div>
    <DActivity v-if="$store.state.common.device_type == 'desktop'" />
    <MActivity v-else />
  </div>
</template>

<script>
import DActivity from '~/components/desktop/activity/DActivity.vue'
import MActivity from '~/components/mobile/activity/MActivity.vue'

export default {
  name: 'Activity',
  components: {
    DActivity,
    MActivity,
  },
}
</script>
