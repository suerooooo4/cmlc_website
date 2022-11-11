<template>
  <div>
    <v-card class="form">
      <v-card-text>
        <h1 class="form__title text-center">
          {{ $t('SHARED.LOGIN.NAME') }}
        </h1>

        <p class="form__subtitle text-center">
          {{ $t('SHARED.LOGIN.SUBNAME') }}
        </p>

        <v-form ref="form" v-model="form.valid">
          <div class="form__textField">
            <label class="label">{{ $t('SHARED.LOGIN.INPUT.EMAIL') }} :</label>
            <v-text-field
              type="email"
              v-model="form.value.email"
              single-line
              outlined
            ></v-text-field>
          </div>

          <div class="form__textField">
            <label class="label"
              >{{ $t('SHARED.LOGIN.INPUT.PASSWORD') }} :</label
            >
            <v-text-field
              type="password"
              v-model="form.value.password"
              single-line
              outlined
            ></v-text-field>
          </div>

          <div class="d-flex justify-end form__register">
            <a @click="closeForm(true)">
              {{ $t('SHARED.REGISTER.NAME') }}
            </a>
          </div>

          <div class="d-flex flex-column align-center mt-3">
            <v-btn
              depressed
              large
              class="form__submit"
              color="primary"
              @click="submit()"
            >
              {{ $t('SHARED.LOGIN.INPUT.SUBMIT') }}
            </v-btn>

            <v-btn
              depressed
              plain
              large
              class="form__cancel mt-3"
              @click="closeForm(false)"
            >
              {{ $t('SHARED.LOGIN.INPUT.CANCEL') }}
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'DLogin',
  data() {
    const requiredMsg = this.$t('SHARED.FORM_VALIDATION.REQUIRED')

    return {
      form: {
        valid: false,
        value: {
          email: null,
          password: null,
        },
        rules: {
          email: [(v) => !!v || requiredMsg],
          password: [(v) => !!v || requiredMsg],
        },
      },
    }
  },
  methods: {
    closeForm(value) {
      this.$refs.form.reset()
      this.$emit('login_dialog', value)
    },
    async submit() {
      const resValidate = this.$refs.form.validate()

      if (resValidate) {
        let res = await this.$store.dispatch('user/login', this.form.value)

        if (res.status == 'success') {
          this.$store.commit('user/setData', res.data)
          this.closeForm()
          this.clearForm()
          this.$router.push({ path: '/profile' })
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
        email: null,
        password: null,
      }
    },
  },
}
</script>

<style scoped lang="scss">
.form {
  padding: 25px 100px;

  &__title {
    margin: 15px 0;
    text-align: center;
    font-size: 32px;
    color: #001538;
  }

  &__subtitle {
    margin-top: 5px;
    margin-bottom: 30px;
    font-size: 18px;
    text-align: center;
    color: #b2b2b2;
  }

  &__textField {
    .label {
      font-size: 16px;
      line-height: 17px;
      color: #001538;
    }
  }

  &__register > a {
    font-size: 14px;
    color: #001538;
    text-decoration: underline;
  }

  &__submit {
    background-color: #001538 !important;
  }
}
</style>
