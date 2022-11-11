<template>
  <div>
    <DTrainingDocumentDetail
      v-if="$store.state.common.device_type == 'desktop'"
    />
    <MTrainingDocumentDetail v-else />
  </div>
</template>

<script>
import DTrainingDocumentDetail from '~/components/desktop/training-document/DTrainingDocumentDetail.vue'
import MTrainingDocumentDetail from '~/components/mobile/training-document/MTrainingDocumentDetail.vue'

export default {
  name: 'TrainingDocumentDetail',
  components: {
    DTrainingDocumentDetail,
    MTrainingDocumentDetail,
  },
}
</script>
