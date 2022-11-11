<template>
  <div>
    <DGallery v-if="$store.state.common.device_type == 'desktop'" />
    <MGallery v-else />
  </div>
</template>

<script>
import DGallery from '~/components/desktop/gallery/DGallery.vue'
import MGallery from '~/components/mobile/gallery/MGallery.vue'

export default {
  name: 'Gallery',
  components: {
    DGallery,
    MGallery,
  },
}
</script>
