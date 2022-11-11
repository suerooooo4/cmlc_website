<template>
  <div>
    <DMediaGeneralDetail v-if="$store.state.common.device_type == 'desktop'" />
    <MMediaGeneralDetail v-else />
  </div>
</template>

<script>
import DMediaGeneralDetail from '~/components/desktop/media-general/DMediaGeneralDetail.vue'
import MMediaGeneralDetail from '~/components/mobile/media-general/MMediaGeneralDetail.vue'

export default {
  name: 'MediaGeneralDetail',
  components: {
    DMediaGeneralDetail,
    MMediaGeneralDetail,
  },
}
</script>
