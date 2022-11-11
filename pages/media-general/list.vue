<template>
  <div>
    <DMediaGeneralList v-if="$store.state.common.device_type == 'desktop'" />
    <MMediaGeneralList v-else />
  </div>
</template>

<script>
import DMediaGeneralList from '~/components/desktop/media-general/DMediaGeneralList.vue'
import MMediaGeneralList from '~/components/mobile/media-general/MMediaGeneralList.vue'

export default {
  name: 'MediaGeneralList',
  components: {
    DMediaGeneralList,
    MMediaGeneralList,
  },
}
</script>
