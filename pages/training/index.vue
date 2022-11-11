<template>
  <div>
    <DTraining v-if="$store.state.common.device_type == 'desktop'" />
    <MTraining v-else />
  </div>
</template>

<script>
import DTraining from '~/components/desktop/training/DTraining.vue'
import MTraining from '~/components/mobile/training/MTraining.vue'

export default {
  name: 'Training',
  components: {
    DTraining,
    MTraining,
  },
}
</script>
