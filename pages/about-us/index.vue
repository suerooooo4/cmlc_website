<template>
  <div>
    <DAboutUs v-if="$store.state.common.device_type == 'desktop'" />
    <MAboutUs v-else />
  </div>
</template>

<script>
import DAboutUs from '~/components/desktop/about-us/DAboutUs.vue'
import MAboutUs from '~/components/mobile/about-us/MAboutUs.vue'

export default {
  name: 'AboutUs',
  components: {
    DAboutUs,
    MAboutUs,
  },
}
</script>
