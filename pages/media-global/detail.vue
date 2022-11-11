<template>
  <div>
    <DMediaGlobalDetail v-if="$store.state.common.device_type == 'desktop'" />
    <MMediaGlobalDetail v-else />
  </div>
</template>

<script>
import DMediaGlobalDetail from '~/components/desktop/media-global/DMediaGlobalDetail.vue'
import MMediaGlobalDetail from '~/components/mobile/media-global/MMediaGlobalDetail.vue'

export default {
  name: 'MediaGlobalDetail',
  components: {
    DMediaGlobalDetail,
    MMediaGlobalDetail,
  },
}
</script>
