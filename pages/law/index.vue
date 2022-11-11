<template>
  <div>
    <DLaw v-if="$store.state.common.device_type == 'desktop'" />
    <MLaw v-else />
  </div>
</template>

<script>
import DLaw from '~/components/desktop/law/DLaw.vue'
import MLaw from '~/components/mobile/law/MLaw.vue'

export default {
  name: 'Law',
  components: {
    DLaw,
    MLaw,
  },
}
</script>
