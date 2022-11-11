<template>
  <div>
    <v-container>
      <div class="header">
        <h1 class="main-title text-center">{{ $t('CONTACT_US.NAME') }}</h1>
        <h5 class="sub-title text-center">{{ $t('CONTACT_US.SUBNAME') }}</h5>
      </div>

      <div class="contact-container">
        <div class="box-detail">
          <div class="content">
            <p class="content__address">
              {{ $t('CONTACT_US.CONTENT.ADDRESS_DATA') }}
            </p>

            <p class="content__email">
              {{ $t('CONTACT_US.CONTENT.EMAIL') }} :
              {{ $t('CONTACT_US.CONTENT.EMAIL_DATA') }}
            </p>

            <p class="content__facebook">
              {{ $t('CONTACT_US.CONTENT.FACEBOOK') }} :
              {{ $t('CONTACT_US.CONTENT.FACEBOOK_DATA') }}
            </p>

            <p class="content__phoneNumber">
              {{ $t('CONTACT_US.CONTENT.PHONE_NUMBER') }} :
              {{ $t('CONTACT_US.CONTENT.PHONE_NUMBER_DATA') }}
            </p>

            <!--div class="content__media">
              <v-btn icon><i class="youtube"></i></v-btn>
              <v-btn icon><i class="instagram"></i></v-btn>
              <v-btn icon><i class="facebook"></i></v-btn>
            </div-->

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.8024954315874!2d99.89405571524479!3d19.028422787115232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30d83369b9fd7285%3A0x48422f267bc2c6ec!2z4Lih4Lir4Liy4Lin4Li04LiX4Lii4Liy4Lil4Lix4Lii4Lie4Liw4LmA4Lii4Liy!5e0!3m2!1sth!2sth!4v1629886344522!5m2!1sth!2sth"
              class="content__map"
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
        <div class="box-form-contact-us">
          <div class="form">
            <h1 class="form__title">{{ $t('CONTACT_US.FORM.TITLE') }}</h1>

            <v-form ref="form" v-model="form.valid">
              <div class="form__textField">
                <label class="label"
                  >{{ $t('CONTACT_US.FORM.INPUT.FULLNAME') }} :</label
                >
                <v-text-field
                  type="text"
                  v-model="form.value.fullname"
                  :rules="form.rules.fullname"
                  single-line
                  solo
                ></v-text-field>
              </div>

              <div class="form__textField">
                <label class="label"
                  >{{ $t('CONTACT_US.FORM.INPUT.EMAIL') }} :</label
                >
                <v-text-field
                  type="email"
                  v-model="form.value.email"
                  :rules="form.rules.email"
                  single-line
                  solo
                ></v-text-field>
              </div>

              <div class="form__textField">
                <label class="label"
                  >{{ $t('CONTACT_US.FORM.INPUT.TEXT') }} :</label
                >
                <v-textarea
                  v-model="form.value.detail"
                  :rules="form.rules.detail"
                  solo
                  name="input-7-4"
                ></v-textarea>
              </div>

              <div class="d-flex justify-end">
                <v-btn
                  depressed
                  class="form__submit"
                  color="primary"
                  @click="submit()"
                >
                  {{ $t('CONTACT_US.FORM.INPUT.SUBMIT') }}
                </v-btn>
              </div>
            </v-form>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'MContactUs',
  data() {
    const requiredMsg = this.$t('SHARED.FORM_VALIDATION.REQUIRED')
    const invalidEmailFormatMsg = this.$t('SHARED.FORM_VALIDATION.EMAIL_FORMAT')

    return {
      form: {
        valid: false,
        value: {
          fullname: null,
          email: null,
          detail: null,
        },
        rules: {
          fullname: [(v) => !!v || requiredMsg],
          email: [
            (v) => {
              if (!!v) return /.+@.+\..+/.test(v) || invalidEmailFormatMsg
              else return requiredMsg
            },
          ],
          detail: [(v) => !!v || requiredMsg],
        },
      },
    }
  },
  methods: {
    async submit() {
      const resValidate = this.$refs.form.validate()

      if (resValidate) {
        let res = await this.$store.dispatch('contact_us/send', this.form.value)

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
    clearForm() {
      this.form.value = {
        fullname: null,
        email: null,
        detail: null,
      }
    },
  },
}
</script>

<style scoped lang="scss">
i {
  border: 1px solid #001538;
}

.header {
  margin: 50px 0 0;

  .main-title {
    font-size: 36px;
    color: #001538;
  }

  .sub-title {
    font-size: 24px;
    color: #b2b2b2;
    font-weight: normal;
  }
}

.contact-container {
  align-content: stretch;
  margin: 50px 0 100px;

  .box-form-contact-us {
    width: 100%;
    background: #ffffff;
    box-shadow: 2px 10px 28px rgba(75, 0, 129, 0.12);
    border-radius: 0 0 6px 6px;
    overflow: auto; // clear-fix

    .form {
      margin: 15px;
      &__title {
        margin-bottom: 15px;
        color: #001538;
        font-size: 32px;
        font-weight: bold;
      }

      &__textField {
        margin-top: 5px;

        .label {
          font-size: 14px;
          line-height: 17px;
          color: #001538;
        }
      }

      &__submit {
        background-color: #001538 !important;
      }
    }
  }

  .box-detail {
    width: 100%;
    background-color: #001538;
    border-radius: 6px 6px 0 0;
    overflow: auto; // clear-fix

    .content {
      margin: 15px;
      color: #fff;
      font-size: 14px;

      &__map {
        margin-top: 30px;
        width: 100%;
        height: 300px;
        border-radius: 4px;
        border: 1px solid #fff;
      }
    }
  }
}
</style>

<style>
.box-form-contact-us > .form .form__textField .v-input__slot {
  box-shadow: unset !important;
  background: #f8f7f6;
}
</style>
