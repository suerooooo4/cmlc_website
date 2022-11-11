<template>
  <div>
    <DArticle v-if="$store.state.common.device_type == 'desktop'" />
    <MArticle v-else />
  </div>
</template>

<script>
import DArticle from '~/components/desktop/article/DArticle.vue'
import MArticle from '~/components/mobile/article/MArticle.vue'

export default {
  name: 'Article',
  components: {
    DArticle,
    MArticle,
  },
}
</script>
