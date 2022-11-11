<template>
  <div>
    <DCourse v-if="$store.state.common.device_type == 'desktop'" />
    <MCourse v-else />
  </div>
</template>

<script>
import DCourse from '~/components/desktop/course/DCourse.vue'
import MCourse from '~/components/mobile/course/MCourse.vue'

export default {
  name: 'Course',
  components: {
    DCourse,
    MCourse,
  },
}
</script>
