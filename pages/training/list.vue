<template>
  <div>
    <DTrainingList v-if="$store.state.common.device_type == 'desktop'" />
    <MTrainingList v-else />
  </div>
</template>

<script>
import DTrainingList from '~/components/desktop/training/DTrainingList.vue'
import MTrainingList from '~/components/mobile/training/MTrainingList.vue'

export default {
  name: 'TrainingList',
  components: {
    DTrainingList,
    MTrainingList,
  },
}
</script>
