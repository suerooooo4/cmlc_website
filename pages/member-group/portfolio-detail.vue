<template>
  <div>
    <DMemberGroupPortfolioDetail
      v-if="$store.state.common.device_type == 'desktop'"
    />
    <MMemberGroupPortfolioDetail v-else />
  </div>
</template>

<script>
import DMemberGroupPortfolioDetail from '~/components/desktop/member-group/DMemberGroupPortfolioDetail.vue'
import MMemberGroupPortfolioDetail from '~/components/mobile/member-group/MMemberGroupPortfolioDetail.vue'

export default {
  name: 'MemberGroupPortfolioDetail',
  components: {
    DMemberGroupPortfolioDetail,
    MMemberGroupPortfolioDetail,
  },
}
</script>
