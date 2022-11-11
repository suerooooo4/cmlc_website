<template>
  <div>
    <DTrainingPortfolioDetail
      v-if="$store.state.common.device_type == 'desktop'"
    />
    <MTrainingPortfolioDetail v-else />
  </div>
</template>

<script>
import DTrainingPortfolioDetail from '~/components/desktop/training-portfolio/DTrainingPortfolioDetail.vue'
import MTrainingPortfolioDetail from '~/components/mobile/training-portfolio/MTrainingPortfolioDetail.vue'

export default {
  name: 'TrainingPortfolioDetail',
  components: {
    DTrainingPortfolioDetail,
    MTrainingPortfolioDetail,
  },
}
</script>
