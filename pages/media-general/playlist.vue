<template>
  <div>
    <DMediaGeneral v-if="$store.state.common.device_type == 'desktop'" />
    <MMediaGeneral v-else />
  </div>
</template>

<script>
  import DMediaGeneral from '~/components/desktop/media-general/DMediaGeneral.vue'
  import MMediaGeneral from '~/components/mobile/media-general/MMediaGeneral.vue'

  export default {
    name: 'MediaMaster',
    components: {
      DMediaGeneral,
      MMediaGeneral,
    },
  }
</script>
