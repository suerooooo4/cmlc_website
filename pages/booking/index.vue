<template>
  <div>
    <DBooking v-if="$store.state.common.device_type == 'desktop'" />
    <MBooking v-else />
  </div>
</template>

<script>
import DBooking from '~/components/desktop/booking/DBooking.vue'
import MBooking from '~/components/mobile/booking/MBooking.vue'

export default {
  name: 'Booking',
  components: {
    DBooking,
    MBooking,
  },
}
</script>
