<template>
  <div>
    <DTrainingVideoPlaylist
      v-if="$store.state.common.device_type == 'desktop'"
    />
    <MTrainingVideoPlaylist v-else />
  </div>
</template>

<script>
  import DTrainingVideoPlaylist from '~/components/desktop/training-video-document/DTrainingVideoPlaylist.vue'
  import MTrainingVideoPlaylist from '~/components/mobile/training-video-document/MTrainingVideoPlaylist.vue'

  export default {
    name: 'TrainingVideoDocument',
    components: {
      DTrainingVideoPlaylist,
      MTrainingVideoPlaylist,
    },
  }
</script>
