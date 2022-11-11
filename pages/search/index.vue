<template>
  <div>
    <DSearch v-if="$store.state.common.device_type == 'desktop'" />
    <MSearch v-else />
  </div>
</template>

<script>
import DSearch from '~/components/desktop/search/DSearch.vue'
import MSearch from '~/components/mobile/search/MSearch.vue'

export default {
  name: 'Search',
  components: {
    DSearch,
    MSearch,
  },
}
</script>
