<template>
  <div>
    <DProfile v-if="$store.state.common.device_type == 'desktop'" />
    <MProfile v-else />
  </div>
</template>

<script>
import DProfile from '~/components/desktop/profile/DProfile.vue'
import MProfile from '~/components/mobile/profile/MProfile.vue'

export default {
  name: 'Profile',
  components: {
    DProfile,
    MProfile,
  },
}
</script>
