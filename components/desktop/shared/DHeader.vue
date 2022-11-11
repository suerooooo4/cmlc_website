<template>
  <header>
    <v-container class="header">
      <div class="head-bar">
        <v-row>
          <v-col>
            <img
              @click="openPage('/')"
              class="logo"
              alt="logo-cmlc"
              src="@/static/images/LOGO-CMLC.png"
            />
          </v-col>

          <v-col>
            <div class="search-wrapper">
              <v-text-field
                v-model="keyword"
                append-icon="mdi-magnify"
                type="text"
                name="input-10-1"
                :label="$t('SHARED.HEADER.SEARCH')"
                class="pt-1 mt-0"
                single-line
                @keypress="search"
              ></v-text-field>
            </div>
          </v-col>

          <v-col>
            <div class="headbar-btn">
              <ul v-if="!this.$store.state.user.user_id">
                <li>
                  <a @click="openRegister()" class="btn-register">
                    <i class="fa fa-user"></i>
                    {{ $t('SHARED.REGISTER.NAME') }}
                  </a>
                </li>
                <li>
                  <a @click="openLogin()" class="btn-login">
                    <i class="fa fa-lock"></i>
                    {{ $t('SHARED.LOGIN.NAME') }}
                  </a>
                </li>
              </ul>

              <ul v-else>
                <li>
                  <a @click="openPage('/profile')" class="btn-profile">
                    <i class="fa fa-user"></i>
                    {{ $t('SHARED.HEADER.PROFILE') }}
                  </a>
                </li>
                <li>
                  <a @click="logout()" class="btn-logout">
                    <i class="fa fa-sign-out-alt"></i>
                    {{ $t('SHARED.HEADER.LOGOUT') }}
                  </a>
                </li>
              </ul>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>

    <DMenu />

    <v-dialog v-model="register_dialog" persistent max-width="700">
      <DRegister @register_dialog="closeRegisterModal" />
    </v-dialog>

    <v-dialog v-model="login_dialog" persistent max-width="700">
      <DLogin @login_dialog="closeLoginModal" />
    </v-dialog>
  </header>
</template>

<script>
import DMenu from '~/components/desktop/shared/DMenu.vue'
import DRegister from '~/components/desktop/shared/DRegister.vue'
import DLogin from '~/components/desktop/shared/DLogin.vue'

export default {
  name: 'DHeader',
  components: {
    DMenu,
    DRegister,
    DLogin,
  },
  data() {
    return {
      register_dialog: false,
      login_dialog: false,
      keyword: '',
    }
  },
  methods: {
    openPage(path, query = null) {
      this.$router.push({ path, query })
    },
    openRegister() {
      this.register_dialog = true
    },
    openLogin() {
      this.login_dialog = true
    },
    closeRegisterModal(value = false) {
      this.register_dialog = false

      if (value) {
        this.login_dialog = true
      }
    },
    closeLoginModal(value = false) {
      this.login_dialog = false

      if (value) {
        this.register_dialog = true
      }
    },
    search($event) {
      if (this.keyword.trim() && $event.key.toUpperCase() == 'ENTER') {
        this.openPage('/search', { keyword: this.keyword })
      }
    },
    logout() {
      this.$store.dispatch('user/logout')
      this.$store.commit('user/clearData')
      this.openPage('/')
    },
  },
}
</script>

<style scoped lang="scss">
.header {
  .head-bar {
    .logo {
      width: 225px;
      height: 72px;
      cursor: pointer;
    }

    .search-wrapper {
      padding-top: 15px;
    }

    .headbar-btn {
      width: 80%;
      margin: auto;
      padding-top: 30px;
      text-align: center;

      ul {
        list-style: none;

        li {
          padding-left: 10px;
          display: inline-block;

          i.fa {
            margin-right: 5px;
          }
        }

        li:not(:last-child) {
          padding-right: 15px;
          border-right: solid 2px #ccc;
        }
      }
    }
  }
}
</style>
