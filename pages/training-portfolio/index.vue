<template>
  <div>
    <DTrainingPortfolio v-if="$store.state.common.device_type == 'desktop'" />
    <MTrainingPortfolio v-else />
  </div>
</template>

<script>
import DTrainingPortfolio from '~/components/desktop/training-portfolio/DTrainingPortfolio.vue'
import MTrainingPortfolio from '~/components/mobile/training-portfolio/MTrainingPortfolio.vue'

export default {
  name: 'TrainingPortfolio',
  components: {
    DTrainingPortfolio,
    MTrainingPortfolio,
  },
}
</script>
