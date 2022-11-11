<template>
  <div>
    <DCsitereport v-if="$store.state.common.device_type == 'desktop'" />
    <MCsitereport v-else />
  </div>
</template>

<script>
import DCsitereport from '~/components/desktop/csitereport/DCsitereport.vue'
import MCsitereport from '~/components/mobile/csitereport/MCsitereport.vue'

export default {
  name: 'CourseLaw',
  components: {
    DCsitereport,
    MCsitereport,
  },
}
</script>
