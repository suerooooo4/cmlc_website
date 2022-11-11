<template>
  <div>
    <DRss v-if="$store.state.common.device_type == 'desktop'" />
    <MRss v-else />
  </div>
</template>

<script>
import DRss from '~/components/desktop/rss/DRss.vue'
import MRss from '~/components/mobile/rss/MRss.vue'

export default {
  name: 'Rss',
  components: {
    DRss,
    MRss,
  },
}
</script>
