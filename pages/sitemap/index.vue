<template>
  <div>
    <DSitemap v-if="$store.state.common.device_type == 'desktop'" />
    <MSitemap v-else />
  </div>
</template>

<script>
import DSitemap from '~/components/desktop/sitemap/DSitemap.vue'
import MSitemap from '~/components/mobile/sitemap/MSitemap.vue'

export default {
  name: 'Sitemap',
  components: {
    DSitemap,
    MSitemap,
  },
}
</script>
