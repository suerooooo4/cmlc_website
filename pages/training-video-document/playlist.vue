<template>
  <div>
    <DTrainingVideoDocument
      v-if="$store.state.common.device_type == 'desktop'"
    />
    <MTrainingVideoDocument v-else />
  </div>
</template>

<script>
  import DTrainingVideoDocument from '~/components/desktop/training-video-document/DTrainingVideoDocument.vue'
  import MTrainingVideoDocument from '~/components/mobile/training-video-document/MTrainingVideoDocument.vue'

  export default {
    name: 'TrainingVideodetail',
    components: {
      DTrainingVideoDocument,
      MTrainingVideoDocument
    },
  }
</script>