<template>
  <div>
    <DMediaTraining v-if="$store.state.common.device_type == 'desktop'" />
    <MMediaTraining v-else />
  </div>
</template>

<script>
  import DMediaTraining from '~/components/desktop/media-training/DMediaTraining.vue'
  import MMediaTraining from '~/components/mobile/media-training/MMediaTraining.vue'

  export default {
    name: 'MediaMaster',
    components: {
      DMediaTraining,
      MMediaTraining,
    },
  }
</script>
