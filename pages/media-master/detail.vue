<template>
  <div>
    <DMediaMasterDetail v-if="$store.state.common.device_type == 'desktop'" />
    <MMediaMasterDetail v-else />
  </div>
</template>

<script>
import DMediaMasterDetail from '~/components/desktop/media-master/DMediaMasterDetail.vue'
import MMediaMasterDetail from '~/components/mobile/media-master/MMediaMasterDetail.vue'

export default {
  name: 'MediaMasterDetail',
  components: {
    DMediaMasterDetail,
    MMediaMasterDetail,
  },
}
</script>
