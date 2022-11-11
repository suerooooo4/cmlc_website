<template>
  <div>
    <DTrainingVideoDetail v-if="$store.state.common.device_type == 'desktop'" />
    <MTrainingVideoDetail v-else />
  </div>
</template>

<script>
import DTrainingVideoDetail from '~/components/desktop/training-video/DTrainingVideoDetail.vue'
import MTrainingVideoDetail from '~/components/mobile/training-video/MTrainingVideoDetail.vue'

export default {
  name: 'TrainingVideoDetail',
  components: {
    DTrainingVideoDetail,
    MTrainingVideoDetail,
  },
}
</script>
