<template>
  <div>
    <DGalleryDetail v-if="$store.state.common.device_type == 'desktop'" />
    <MGalleryList v-else />
  </div>
</template>

<script>
import DGalleryDetail from '~/components/desktop/gallery/DGalleryDetail.vue'
import MGalleryList from '~/components/mobile/gallery/MGalleryList.vue'

export default {
  name: 'GalleryDetail',
  components: {
    DGalleryDetail,
    MGalleryList,
  },
}
</script>
