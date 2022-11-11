<template>
  <div>
    <DMemberGroupPortfolio
      v-if="$store.state.common.device_type == 'desktop'"
    />
    <MMemberGroupPortfolio v-else />
  </div>
</template>

<script>
import DMemberGroupPortfolio from '~/components/desktop/member-group/DMemberGroupPortfolio.vue'
import MMemberGroupPortfolio from '~/components/mobile/member-group/MMemberGroupPortfolio.vue'

export default {
  name: 'MemberGroupPortfolio',
  components: {
    DMemberGroupPortfolio,
    MMemberGroupPortfolio,
  },
}
</script>
