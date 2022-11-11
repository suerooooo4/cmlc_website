<template>
  <div>
    <v-container>
      <div class="header">
        <h1 class="main-title text-center">{{ $t('PROFILE.TITLE') }}</h1>
      </div>

      <div class="tab-container">
        <v-btn
          @click="selectTab(1)"
          color="primary"
          depressed
          large
          class="tab-profile"
          :class="[tab_selected == 1 ? 'active' : '']"
        >
          {{ $t('PROFILE.TAB.PROFILE.ACTION') }}
        </v-btn>

        <v-btn
          @click="selectTab(2)"
          color="primary"
          depressed
          large
          class="tab-booking-history"
          :class="[tab_selected == 2 ? 'active' : '']"
        >
          {{ $t('PROFILE.TAB.BOOKING.ACTION') }}
        </v-btn>
      </div>

      <div class="content-container">
        <div v-if="tab_selected == 1" class="profile-form">
          <DProfileForm />
        </div>

        <div v-else class="booking-history">
          <DBookingHistory />
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import DProfileForm from '~/components/desktop/profile/DProfileForm.vue'
import DBookingHistory from '~/components/desktop/profile/DBookingHistory.vue'
import DChangePassword from '~/components/desktop/shared/DChangePassword.vue'

export default {
  name: 'DProfile',
  components: {
    DProfileForm,
    DBookingHistory,
    DChangePassword,
  },
  data() {
    return {
      tab_selected: 1,
    }
  },
  mounted() {
    this.$auth()
  },
  methods: {
    selectTab(tab) {
      this.tab_selected = tab
    },
  },
}
</script>

<style scoped lang="scss">
.header {
  margin: 50px 0 0;

  .main-title {
    font-size: 36px;
    color: #001538;
  }
}

.tab-container {
  margin-top: 80px;

  .tab-profile,
  .tab-booking-history {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  .tab-profile.active,
  .tab-booking-history.active {
    background: #c5934b !important;
  }
}

.content-container {
  margin-bottom: 100px;
  padding: 50px;
  background: #f8f7f6;
  border-radius: 0px 10px 10px 10px;
}
</style>
