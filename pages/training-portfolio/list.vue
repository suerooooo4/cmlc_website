<template>
  <div>
    <DTrainingPortfolioList
      v-if="$store.state.common.device_type == 'desktop'"
    />
    <MTrainingPortfolioList v-else />
  </div>
</template>

<script>
import DTrainingPortfolioList from '~/components/desktop/training-portfolio/DTrainingPortfolioList.vue'
import MTrainingPortfolioList from '~/components/mobile/training-portfolio/MTrainingPortfolioList.vue'

export default {
  name: 'TrainingPortfolioList',
  components: {
    DTrainingPortfolioList,
    MTrainingPortfolioList,
  },
}
</script>
