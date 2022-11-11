<template>
  <v-footer color="primary" dark>
    <v-container class="footer">
      <v-row>
        <v-col>
          <!-- <div>
            <h2 class="footer-title">
              {{ $t('SHARED.FOOTER.ABOUT_US.TITLE') }}
            </h2> -->
          <!-- 
            <div
              class="footer-detail"
              v-html="$t('SHARED.FOOTER.ABOUT_US.DETAIL')"
            ></div> 
          </div>-->

          <div class="footer-copyright mt-1" >
            <img
              src="@/static/images/LOGO-CMLC-2.png"
              alt="logo-image-footer"
              width="45%"
            />

            <p class="copyright">Copyright © 2021. All rights reserved.</p>
          </div>
        </v-col>

        <v-col>
          <div>
            <h2 class="footer-title">
              {{ $t('SHARED.FOOTER.SUPPORT.TITLE') }}
            </h2>

            <div
              class="footer-detail"
              v-html="$t('SHARED.FOOTER.SUPPORT.DETAIL')"
            ></div>
          </div>
        </v-col>

        <v-col>
          <div>
            <h2 class="footer-title">
              {{ $t('SHARED.FOOTER.CONTACT_US.TITLE') }}
            </h2>
            <div class="footer-detail">
              <p>{{ $t('SHARED.FOOTER.CONTACT_US.DETAIL') }}</p>
              <p>
                <v-icon dense color="while darken-2">mdi-email</v-icon> &nbsp;{{
                  $t('SHARED.FOOTER.CONTACT_US.EMAIL')
                }}
              </p>
              <p>
                <v-icon dense color="while darken-2">mdi-phone-classic</v-icon>
                &nbsp;{{ $t('SHARED.FOOTER.CONTACT_US.TELEPHONE') }}
              </p>
              <p>
                <v-icon dense color="while darken-2">mdi-cellphone</v-icon>
                &nbsp;{{ $t('SHARED.FOOTER.CONTACT_US.MOBILE_PHONE') }}
              </p>
            </div>
          </div>
        </v-col>

        <v-col>
          <div>
            <h2 class="footer-title">
              {{ $t('SHARED.FOOTER.OTHER.TITLE') }}
            </h2>

            <div class="footer-detail">
              <p>
                <a @click="openPage('/rss')">{{ $t('RSS.TITLE') }}</a>
              </p>

              <p>
                <a @click="openPage('/sitemap')">{{ $t('SITEMAP.TITLE') }}</a>
              </p>

              <p v-if="this.$store.state.user.user_id">
                <a @click="openPage('/poll')">{{ $t('POLL.TITLE') }}</a>
              </p>
              <p>
                <a @click="openPage('/organization')">{{
                  $t('ORGANIZATION.TITLE')
                }}</a>
              </p>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-divider></v-divider>
        </v-col>
        <v-col cols="12">
          <div class="text-center">ผู้เข้าชมเว็บไซต์ {{ view_total }}</div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'DFooter',

  data() {
    return {
      view_total:0,

    }
  },

  async mounted() {
 
    await this.getViewTotal()
  },
  methods: {
    openPage(path, query = null) {
      this.$router.push({ path, query })
    },
    async getViewTotal() {
      let res = await this.$store.dispatch('view_counter/get')
      this.view_total = res.data
    },
  }
}
</script>

<style scoped lang="scss">
.footer {
  padding: 50px 0 20px 0;

  .footer-title {
    margin-bottom: 15px;
  }

  .footer-detail {
    font-size: 14px;
    color: #c4c4c4;

    a {
      color: #c4c4c4;
    }
  }

  .footer-copyright {
    margin-top: 50px;

    .copyright {
      font-size: 14px;
      color: #c4c4c4;
    }
  }
}
</style>
