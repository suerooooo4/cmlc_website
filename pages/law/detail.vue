<template>
  <div>
    <DLawDetail v-if="$store.state.common.device_type == 'desktop'" />
    <MLawDetail v-else />
  </div>
</template>

<script>
import DLawDetail from '~/components/desktop/law/DLawDetail.vue'
import MLawDetail from '~/components/mobile/law/MLawDetail.vue'

export default {
  name: 'LawDetail',
  components: {
    DLawDetail,
    MLawDetail,
  },
}
</script>
