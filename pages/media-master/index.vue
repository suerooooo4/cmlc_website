<template>
  <div>
    <DMediaMasterPlaylist v-if="$store.state.common.device_type == 'desktop'" />
    <MMediaMasterPlaylist v-else />
  </div>
</template>

<script>
  import DMediaMasterPlaylist from '~/components/desktop/media-master/DMediaMasterPlaylist.vue'
  import MMediaMasterPlaylist from '~/components/mobile/media-master/MMediaMasterPlaylist.vue'

  export default {
    name: 'MediaMaster',
    components: {
      DMediaMasterPlaylist,
      MMediaMasterPlaylist,
    },
  }
</script>
