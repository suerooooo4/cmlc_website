<template>
  <v-card class="modal">
    <v-card-text>
      <h1 class="modal__title text-center">
        {{ $t('SHARED.REGISTER.NAME') }}
      </h1>
      <h5 class="modal__subtitle text-center">
        {{ $t('SHARED.REGISTER.SUBNAME') }}
      </h5>
      <v-form ref="form" v-model="form.valid">
        <div class="modal__textField">
          <label class="label"
            >{{ $t('SHARED.REGISTER.INPUT.FULLNAME') }} :</label
          >
          <v-text-field
            type="text"
            v-model="form.value.fullname"
            :rules="form.rules.fullname"
            single-line
            outlined
          ></v-text-field>
        </div>
        <div class="modal__textField">
          <label class="label">{{ $t('SHARED.REGISTER.INPUT.EMAIL') }} :</label>
          <v-text-field
            type="email"
            v-model="form.value.email"
            :rules="form.rules.email"
            single-line
            outlined
          ></v-text-field>
        </div>
        <div class="modal__textField">
          <label class="label"
            >{{ $t('SHARED.REGISTER.INPUT.PASSWORD') }} :</label
          >
          <v-text-field
            type="password"
            v-model="form.value.password"
            :rules="form.rules.password"
            single-line
            outlined
          ></v-text-field>
        </div>

        <div class="d-flex justify-end modal__login">
          <a @click="$emit('register_dialog', { is_open_login: true })">
            <v-btn icon> <i class="profile"></i> </v-btn
            >{{ $t('SHARED.LOGIN.NAME') }}
          </a>
          <v-dialog v-model="login_dialog" persistent max-width="305">
            <MLogin />
          </v-dialog>
        </div>

        <div class="d-flex flex-column align-center mt-3">
          <v-btn
            depressed
            class="modal__submit"
            color="primary"
            @click="submit()"
          >
            {{ $t('SHARED.REGISTER.INPUT.SUBMIT') }}
          </v-btn>
          <v-btn icon class="modal__cancel mt-3" @click="closeForm(false)">
            {{ $t('SHARED.REGISTER.INPUT.CANCEL') }}
          </v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import Swal from 'sweetalert2'
import MLogin from '~/components/mobile/shared/MLogin.vue'
export default {
  name: 'MRegister',
  components: {
    MLogin,
  },
  props: {
    entrance: String,
  },
  data() {
    const requiredMsg = this.$t('SHARED.FORM_VALIDATION.REQUIRED')
    const invalidEmailFormatMsg = this.$t('SHARED.FORM_VALIDATION.EMAIL_FORMAT')

    return {
      login_dialog: false,
      form: {
        valid: false,
        value: {
          fullname: null,
          email: null,
          password: null,
        },
        rules: {
          fullname: [(v) => !!v || requiredMsg],
          email: [
            (v) => {
              if (!!v) return /.+@.+\..+/.test(v) || invalidEmailFormatMsg
              else return requiredMsg
            },
          ],
          password: [(v) => !!v || requiredMsg],
        },
      },
    }
  },
  methods: {
    closeForm: function (event) {
      this.form.value = {
        fullname: null,
        email: null,
        password: null,
      }
      this.$emit('register_dialog', false)
    },
    async submit() {
      const resValidate = this.$refs.form.validate()

      if (resValidate) {
        let res = await this.$store.dispatch('user/register', this.form.value)

        if (res.status == 'success') {
          Swal.fire({
            title: this.$t('SHARED.DIALOG.SUCCESS'),
            text: this.$t(`SHARED.RESPONSE_MSG.SUCCESS_TO_SAVE_DATA`),
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: this.$t('SHARED.DIALOG.CLOSE'),
          })
          this.$store.commit('user/setData', res.data)
          this.closeForm()
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
  },
}
</script>

<style scoped lang="scss">
.modal {
  &__title {
    color: #001538;
    margin-top: 30px;
  }
  &__subtitle {
    margin-top: 5px;
    margin-bottom: 15px;
  }
  &__login > a {
    font-size: 12px;
    color: #001538;
    text-decoration: underline;
  }
  &__textField {
    .label {
      font-size: 16px;
      line-height: 17px;
      color: #001538;
    }
  }
  &__submit {
    background-color: #001538 !important;
  }
}
.register {
  color: #fff;
  text-decoration: none;
}
.register-dialog {
  color: #001538;
}
.row-menu {
  display: block;
  margin: 0;
}
</style>
