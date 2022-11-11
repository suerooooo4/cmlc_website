<template>
  <div>
    <DMediaTrainingPlaylist
      v-if="$store.state.common.device_type == 'desktop'"
    />
    <MMediaTrainingPlaylist v-else />
  </div>
</template>

<script>
  import DMediaTrainingPlaylist from '~/components/desktop/media-training/DMediaTrainingPlaylist.vue'
  import MMediaTrainingPlaylist from '~/components/mobile/media-training/MMediaTrainingPlaylist.vue'

  export default {
    name: 'MediaTraining',
    components: {
      DMediaTrainingPlaylist,
      MMediaTrainingPlaylist,
    },
  }
</script>
