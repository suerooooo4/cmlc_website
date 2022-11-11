<template>
  <div>
    <v-card class="form">
      <v-card-text>
        <h1 class="form__title text-center">
          {{ $t('BOOKING.EQUIPMENT_BORROWING.MODAL_CONDITION.TITLE') }}
        </h1>

        <p
          class="condition"
          v-html="$t('BOOKING.EQUIPMENT_BORROWING.MODAL_CONDITION.CONDITION')"
        ></p>

        <div class="checkbox-container">
          <v-checkbox
            v-model="accept_condition"
            :label="$t('BOOKING.EQUIPMENT_BORROWING.MODAL_CONDITION.ACCEPT')"
          ></v-checkbox>
        </div>

        <div class="text-center mt-3 mb-5">
          <v-btn
            @click="submit()"
            color="primary"
            depressed
            large
            :disabled="!accept_condition"
            width="120"
          >
            {{ $t('BOOKING.EQUIPMENT_BORROWING.MODAL_CONDITION.NEXT') }}
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'DBorrowEquipmentCondition',
  data() {
    return {
      accept_condition: false,
    }
  },
  methods: {
    closeForm(value) {
      this.$emit('equipment_condition_dialog', value)
    },
    async submit() {
      let res = await this.$store.dispatch(
        'equipment_term_and_condition/create'
      )

      if (res.status == 'success') {
        this.closeForm(true)
      } else {
        this.closeForm(false)
        Swal.fire({
          title: this.$t('SHARED.DIALOG.ERROR'),
          text: this.$t(`SHARED.RESPONSE_MSG.${res.error}`),
          icon: 'error',
          showCancelButton: false,
          confirmButtonText: this.$t('SHARED.DIALOG.CLOSE'),
        })
      }
    },
  },
}
</script>

<style scoped lang="scss">
.form {
  padding: 15px 50px;

  &__title {
    margin: 15px 0;
    text-align: center;
    color: #001538;
  }

  .condition {
    margin: 50px 0 25px;
    color: #001538;
  }

  .checkbox-container {
    width: 150px;
    margin: auto;
  }
}
</style>
