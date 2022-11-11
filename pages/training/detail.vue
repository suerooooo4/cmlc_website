<template>
  <div>
    <DTrainingDetail v-if="$store.state.common.device_type == 'desktop'" />
    <MTrainingDetail v-else />
  </div>
</template>

<script>
import DTrainingDetail from '~/components/desktop/training/DTrainingDetail.vue'
import MTrainingDetail from '~/components/mobile/training/MTrainingDetail.vue'

export default {
  name: 'TrainingDetail',
  components: {
    DTrainingDetail,
    MTrainingDetail,
  },
}
</script>
