<template>
  <div>
    <DOrganization v-if="$store.state.common.device_type == 'desktop'" />
    <MOrganization v-else />
  </div>
</template>

<script>
import DOrganization from '~/components/desktop/organization/DOrganization.vue'
import MOrganization from '~/components/mobile/organization/MOrganization.vue'

export default {
  name: 'Organization',
  components: {
    DOrganization,
    MOrganization,
  },
}
</script>
