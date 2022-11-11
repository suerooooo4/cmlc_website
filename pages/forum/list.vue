<template>
  <div>
    <DForumList v-if="$store.state.common.device_type == 'desktop'" />
    <MForumList v-else />
  </div>
</template>

<script>
import DForumList from '~/components/desktop/forum/DForumList.vue'
import MForumList from '~/components/mobile/forum/MForumList.vue'

export default {
  name: 'ForumList',
  components: {
    DForumList,
    MForumList,
  },
}
</script>
