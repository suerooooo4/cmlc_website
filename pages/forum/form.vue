<template>
  <div>
    <DForumForm v-if="$store.state.common.device_type == 'desktop'" />
    <MForumForm v-else />
  </div>
</template>

<script>
import DForumForm from '~/components/desktop/forum/DForumForm.vue'
import MForumForm from '~/components/mobile/forum/MForumForm.vue'

export default {
  name: 'ForumForm',
  components: {
    DForumForm,
    MForumForm,
  },
}
</script>
