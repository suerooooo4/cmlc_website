<template>
  <div>
    <DNews v-if="$store.state.common.device_type == 'desktop'" />
    <MNews v-else />
  </div>
</template>

<script>
import DNews from '~/components/desktop/news/DNews.vue'
import MNews from '~/components/mobile/news/MNews.vue'

export default {
  name: 'News',
  components: {
    DNews,
    MNews,
  },
}
</script>
