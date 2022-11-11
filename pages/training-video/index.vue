<template>
  <div>
    <DTrainingVideo v-if="$store.state.common.device_type == 'desktop'" />
    <MTrainingVideo v-else />
  </div>
</template>

<script>
import DTrainingVideo from '~/components/desktop/training-video/DTrainingVideo.vue'
import MTrainingVideo from '~/components/mobile/training-video/MTrainingVideo.vue'

export default {
  name: 'TrainingVideo',
  components: {
    DTrainingVideo,
    MTrainingVideo,
  },
}
</script>
