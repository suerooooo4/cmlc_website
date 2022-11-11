<template>
  <div>
    <v-card>
      <v-card-text class="review-container">
        <h2 class="review-title">
          {{ $t('BOOKING.EQUIPMENT_BORROWING.MODAL_REVIEW.TITLE') }}
        </h2>

        <section class="review-wrapper">
          <div v-if="review_list.length">
            <div v-for="review of review_list" :key="review.id" class="review">
              <div class="reviewer d-flex">
                <img
                  :src="`${image_url}${review.user.image}`"
                  alt="user-image"
                  class="user-image"
                />
                <span class="user-fullname">{{ review.user.fullname }}</span>
              </div>

              <p class="review-comment">
                {{ review.comment }}
              </p>

              <div class="text-right">
                <span class="review-date">{{ review.created_at }}</span>
              </div>
            </div>
          </div>

          <div v-else class="review">
            <p class="text-center pt-4">
              {{ $t('BOOKING.EQUIPMENT_BORROWING.MODAL_REVIEW.NO_RESULT') }}
            </p>
          </div>
        </section>

        <section class="review-form">
          <v-form v-if="permission_review" ref="form" v-model="form.valid">
            <div class="form-group">
              <label>{{
                $t('BOOKING.EQUIPMENT_BORROWING.MODAL_REVIEW.COMMENT')
              }}</label>

              <v-textarea
                v-model="form.value.comment"
                :rules="form.rules.comment"
                type="text"
                single-line
                outlined
              ></v-textarea>
            </div>
          </v-form>

          <div class="form-group text-right">
            <v-btn
              v-if="permission_review"
              large
              color="primary"
              @click="submit()"
            >
              {{ $t('BOOKING.EQUIPMENT_BORROWING.MODAL_REVIEW.SUBMIT') }}
            </v-btn>

            <v-btn large @click="closeDialog()" class="ml-2">
              {{ $t('BOOKING.EQUIPMENT_BORROWING.MODAL_REVIEW.CANCEL') }}
            </v-btn>
          </div>
        </section>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'DBorrowEquipmentReview',
  props: ['id'],
  data() {
    const requiredMsg = this.$t('SHARED.FORM_VALIDATION.REQUIRED')

    return {
      image_url: process.env.image_url,
      review_list: [],
      form: {
        valid: false,
        value: {
          equipment_id: null,
          comment: null,
        },
        rules: {
          comment: [(v) => !!v || requiredMsg],
        },
      },
      permission_review: false,
    }
  },
  async mounted() {
    await this.getReview()
    await this.getPermissionReview()
  },
  methods: {
    async getReview() {
      let res = await this.$store.dispatch('equipment_review/get', this.id)
      this.review_list = res.data
      this.form.value.equipment_id = this.id
    },
    async getPermissionReview() {
      if (this.$store.state.user.user_id) {
        let res = await this.$store.dispatch(
          'equipment_review/permission',
          this.id
        )

        if (res.data) {
          this.permission_review = true
        } else {
          this.permission_review = false
        }
      } else {
        this.permission_review = false
      }
    },
    async submit() {
      const resValidate = this.$refs.form.validate()

      if (resValidate) {
        let res = await this.$store.dispatch(
          'equipment_review/create',
          this.form.value
        )

        if (res.status == 'success') {
          Swal.fire({
            title: this.$t('SHARED.DIALOG.SUCCESS'),
            text: this.$t(`SHARED.RESPONSE_MSG.SUCCESS_TO_SAVE_DATA`),
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: this.$t('SHARED.DIALOG.CLOSE'),
          })
          this.clearForm()
          this.$refs.form.reset()
          this.permission_review = false
          await this.getReview()
        } else {
          Swal.fire({
            title: this.$t('SHARED.DIALOG.ERROR'),
            text: this.$t(`SHARED.RESPONSE_MSG.${res.error}`),
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: this.$t('SHARED.DIALOG.CLOSE'),
          })
        }
      }
    },
    closeDialog() {
      if (this.permission_review) this.$refs.form.reset()
      this.$emit('equipment_review_dialog', false)
    },
    clearForm() {
      this.form.value = {
        equipment_id: null,
        comment: null,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.review-container {
  padding: 25px;

  .review-title {
    padding: 15px 0 35px;
    text-align: center;
    color: var(--v-primary-base);
    font-size: 28px;
  }

  .review-wrapper {
    .review {
      margin-bottom: 15px;
      padding: 15px;
      background: #f4f4f4;
      border-radius: 10px;

      .reviewer {
        margin-bottom: 15px;
        align-items: center;

        .user-image {
          width: 30px;
          height: 30px;
          object-fit: cover;
          object-position: center;
          border-radius: 100%;
        }

        .user-fullname {
          margin-left: 15px;
          color: var(--v-primary-base);
        }
      }

      .review-date {
        font-size: 12px;
        color: #999;
      }
    }
  }

  .review-form {
    padding-top: 15px;

    .form-group {
      label {
        color: var(--v-primary-base);
      }
    }
  }
}
</style>
