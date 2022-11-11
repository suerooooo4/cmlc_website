<template>
  <div>
    <DCourseDetail v-if="$store.state.common.device_type == 'desktop'" />
    <MCourseDetail v-else />
  </div>
</template>

<script>
import DCourseDetail from '~/components/desktop/course/DCourseDetail.vue'
import MCourseDetail from '~/components/mobile/course/MCourseDetail.vue'

export default {
  name: 'CourseDetail',
  components: {
    DCourseDetail,
    MCourseDetail,
  },
}
</script>
