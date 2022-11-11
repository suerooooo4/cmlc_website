<template>
  <div>
    <DArticleDetail v-if="$store.state.common.device_type == 'desktop'" />
    <MArticleDetail v-else />
  </div>
</template>

<script>
import DArticleDetail from '~/components/desktop/article/DArticleDetail.vue'
import MArticleDetail from '~/components/mobile/article/MArticleDetail.vue'

export default {
  name: 'ArticleDetail',
  components: {
    DArticleDetail,
    MArticleDetail,
  },
}
</script>
