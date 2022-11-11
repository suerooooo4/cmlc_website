<template>
  <div>
    <DMemberGroupMember v-if="$store.state.common.device_type == 'desktop'" />
    <MMemberGroupMember v-else />
  </div>
</template>

<script>
import DMemberGroupMember from '~/components/desktop/member-group/DMemberGroupMember.vue'
import MMemberGroupMember from '~/components/mobile/member-group/MMemberGroupMember.vue'

export default {
  name: 'MemberGroupMember',
  components: {
    DMemberGroupMember,
    MMemberGroupMember,
  },
}
</script>
