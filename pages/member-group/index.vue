<template>
  <div>
    <DMemberGroup v-if="$store.state.common.device_type == 'desktop'" />
    <MMemberGroup v-else />
  </div>
</template>

<script>
import DMemberGroup from '~/components/desktop/member-group/DMemberGroup.vue'
import MMemberGroup from '~/components/mobile/member-group/MMemberGroup.vue'

export default {
  name: 'MemberGroup',
  components: {
    DMemberGroup,
    MMemberGroup,
  },
}
</script>
