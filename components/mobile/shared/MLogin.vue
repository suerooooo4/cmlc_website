<template>
  <v-card class="modal">
    <v-card-text>
      <h1 class="modal__title text-center">
        {{ $t('SHARED.LOGIN.NAME') }}
      </h1>
      <h5 class="modal__subtitle text-center">
        {{ $t('SHARED.LOGIN.SUBNAME') }}
      </h5>
      <v-form ref="form" v-model="form.valid">
        <div class="modal__textField">
          <label class="label">{{ $t('SHARED.LOGIN.INPUT.EMAIL') }} :</label>
          <v-text-field
            type="email"
            v-model="form.value.email"
            single-line
            outlined
          ></v-text-field>
        </div>
        <div class="modal__textField">
          <label class="label">{{ $t('SHARED.LOGIN.INPUT.PASSWORD') }} :</label>
          <v-text-field
            type="password"
            v-model="form.value.password"
            single-line
            outlined
          ></v-text-field>
        </div>

        <div class="d-flex justify-end modal__register">
          <a @click="$emit('login_dialog', { is_open_register: true })">
            <v-btn icon> <i class="profile"></i> </v-btn
            >{{ $t('SHARED.REGISTER.NAME') }}
          </a>
          <v-dialog v-model="register_dialog" persistent max-width="305">
            <MRegister />
          </v-dialog>
        </div>

        <div class="d-flex flex-column align-center mt-3">
          <v-btn
            depressed
            class="modal__submit"
            color="primary"
            @click="submit()"
          >
            {{ $t('SHARED.LOGIN.INPUT.SUBMIT') }}
          </v-btn>
          <v-btn icon class="modal__cancel mt-3" @click="closeForm(false)">
            {{ $t('SHARED.LOGIN.INPUT.CANCEL') }}
          </v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import Swal from 'sweetalert2'
import MRegister from '~/components/mobile/shared/MRegister.vue'
export default {
  name: 'MLogin',
  components: {
    MRegister,
  },
  data() {
    const requiredMsg = this.$t('SHARED.FORM_VALIDATION.REQUIRED')

    return {
      register_dialog: false,
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
      this.form.value = {
        email: null,
        password: null,
      }
      this.$emit('login_dialog', value)
    },
    async submit() {
      const resValidate = this.$refs.form.validate()

      if (resValidate) {
        let res = await this.$store.dispatch('user/login', this.form.value)

        if (res.status == 'success') {
          this.$store.commit('user/setData', res.data)
          this.closeForm({ is_submit: true })
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
  &__register > a {
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

.row-menu {
  display: block;
  margin: 0;
}
</style>
