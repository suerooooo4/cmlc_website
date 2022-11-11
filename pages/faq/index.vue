<template>
  <div>
    <DFaq v-if="$store.state.common.device_type == 'desktop'" />
    <MFaq v-else />
  </div>
</template>

<script>
import DFaq from '~/components/desktop/faq/DFaq.vue'
import MFaq from '~/components/mobile/faq/MFaq.vue'

export default {
  name: 'Faq',
  components: {
    DFaq,
    MFaq,
  },
}
</script>
