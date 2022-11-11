<template>
  <div>
    <DTrainingDocument v-if="$store.state.common.device_type == 'desktop'" />
    <MTrainingDocument v-else />
  </div>
</template>

<script>
import DTrainingDocument from '~/components/desktop/training-document/DTrainingDocument.vue'
import MTrainingDocument from '~/components/mobile/training-document/MTrainingDocument.vue'

export default {
  name: 'TrainingDocument',
  components: {
    DTrainingDocument,
    MTrainingDocument,
  },
}
</script>
