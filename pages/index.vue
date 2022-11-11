<template>
  <div>
    <DHome v-if="$store.state.common.device_type == 'desktop'" />
    <MHome v-else />
  </div>
</template>

<script>
import DHome from '~/components/desktop/home/DHome.vue'
import MHome from '~/components/mobile/home/MHome.vue'

export default {
  name: 'Home',
  components: {
    DHome,
    MHome
  }
}
</script>
