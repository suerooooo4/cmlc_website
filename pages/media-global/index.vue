<template>
  <div>
    <DMediaGlobal v-if="$store.state.common.device_type == 'desktop'" />
    <MMediaGlobal v-else />
  </div>
</template>

<script>
import DMediaGlobal from '~/components/desktop/media-global/DMediaGlobal.vue'
import MMediaGlobal from '~/components/mobile/media-global/MMediaGlobal.vue'

export default {
  name: 'MediaGlobal',
  components: {
    DMediaGlobal,
    MMediaGlobal,
  },
}
</script>
