<template>
  <div>
    <DForumHistory v-if="$store.state.common.device_type == 'desktop'" />
    <MForumHistory v-else />
  </div>
</template>

<script>
import DForumHistory from '~/components/desktop/forum/DForumHistory.vue'
import MForumHistory from '~/components/mobile/forum/MForumHistory.vue'

export default {
  name: 'ForumHistory',
  components: {
    DForumHistory,
    MForumHistory,
  },
}
</script>
