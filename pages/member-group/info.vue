<template>
  <div>
    <DMemberGroupInfo v-if="$store.state.common.device_type == 'desktop'" />
    <MMemberGroupInfo v-else />
  </div>
</template>

<script>
import DMemberGroupInfo from '~/components/desktop/member-group/DMemberGroupInfo.vue'
import MMemberGroupInfo from '~/components/mobile/member-group/MMemberGroupInfo.vue'

export default {
  name: 'MemberGroupInfo',
  components: {
    DMemberGroupInfo,
    MMemberGroupInfo,
  },
}
</script>
