<template>
  <div>
    <DForumDetail v-if="$store.state.common.device_type == 'desktop'" />
    <MForumDetail v-else />
  </div>
</template>

<script>
import DForumDetail from '~/components/desktop/forum/DForumDetail.vue'
import MForumDetail from '~/components/mobile/forum/MForumDetail.vue'

export default {
  name: 'ForumDetail',
  components: {
    DForumDetail,
    MForumDetail,
  },
}
</script>
