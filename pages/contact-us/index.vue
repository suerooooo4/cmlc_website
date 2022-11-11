<template>
  <div>
    <DContactUs v-if="$store.state.common.device_type == 'desktop'" />
    <MContactUs v-else />
  </div>
</template>

<script>
import DContactUs from '~/components/desktop/contact-us/DContactUs.vue'
import MContactUs from '~/components/mobile/contact-us/MContactUs.vue'

export default {
  name: 'ContactUs',
  components: {
    DContactUs,
    MContactUs,
  },
}
</script>
