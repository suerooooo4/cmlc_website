<template>
  <div>
    <DCourseLaw v-if="$store.state.common.device_type == 'desktop'" />
    <MCourseLaw v-else />
  </div>
</template>

<script>
import DCourseLaw from '~/components/desktop/course-law/DCourseLaw.vue'
import MCourseLaw from '~/components/mobile/course-law/MCourseLaw.vue'

export default {
  name: 'CourseLaw',
  components: {
    DCourseLaw,
    MCourseLaw,
  },
}
</script>
