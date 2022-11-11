<template>
  <div>
    <DMediaGeneralPlaylist
      v-if="$store.state.common.device_type == 'desktop'"
    />
    <MMediaGeneralPlaylist v-else />
  </div>
</template>

<script>
  import DMediaGeneralPlaylist from '~/components/desktop/media-general/DMediaGeneralPlaylist.vue'
  import MMediaGeneralPlaylist from '~/components/mobile/media-general/MMediaGeneralPlaylist.vue'

  export default {
    name: 'MediaGeneral',
    components: {
      DMediaGeneralPlaylist,
      MMediaGeneralPlaylist,
    },
  }
</script>
