<template>
  <div>
    <DForum v-if="$store.state.common.device_type == 'desktop'" />
    <MForum v-else />
  </div>
</template>

<script>
import DForum from '~/components/desktop/forum/DForum.vue'
import MForum from '~/components/mobile/forum/MForum.vue'

export default {
  name: 'Forum',
  components: {
    DForum,
    MForum,
  },
}
</script>
