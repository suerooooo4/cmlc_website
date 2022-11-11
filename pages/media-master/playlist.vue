<template>
  <div>
    <DMediaMaster v-if="$store.state.common.device_type == 'desktop'" />
    <MMediaMaster v-else />
  </div>
</template>

<script>
  import DMediaMaster from '~/components/desktop/media-master/DMediaMaster.vue'
  import MMediaMaster from '~/components/mobile/media-master/MMediaMaster.vue'

  export default {
    name: 'MediaMaster',
    components: {
      DMediaMaster,
      MMediaMaster,
    },
  }
</script>
