<template>
  <div>
    <DMediaTrainingDetail v-if="$store.state.common.device_type == 'desktop'" />
    <MMediaTrainingDetail v-else />
  </div>
</template>

<script>
import DMediaTrainingDetail from '~/components/desktop/media-training/DMediaTrainingDetail.vue'
import MMediaTrainingDetail from '~/components/mobile/media-training/MMediaTrainingDetail.vue'

export default {
  name: 'MediaTrainingDetail',
  components: {
    DMediaTrainingDetail,
    MMediaTrainingDetail,
  },
}
</script>
