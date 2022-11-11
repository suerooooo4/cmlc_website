<template>
  <div>
    <v-container>
      <div class="header">
        <h2 class="organization-title">
          {{ $t('ORGANIZATION.TITLE') }}
        </h2>
      </div>

      <div class="content-container">
        <v-row>
          <v-col
            sm="7"
            v-for="organization in organization_show"
            :key="organization.id"
          >
            <ul>
              <li >
                <a :href="organization.url" target="_blank" class="text-decoration-none">
                  {{ organization.name_th }}
                </a>
              </li>
            </ul>           
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'DOrganization',
  data() {
    return {
      organization_show:[],
    }
  },
  async mounted() {
    // await this.getQuickLink()
    await this.organization()
  },
  methods: {
    openPage(page) {
      this.$router.push({ path: page })
    },
    async organization() {
      let res = await this.$store.dispatch('organization_link/get')
      this.organization_show = res.data
    },
    // async getQuickLink() {
    //   let res = await this.$store.dispatch('quick_link/get')

    //   this.menu_list2[0].submenu = res.data.map((data) => {
    //     data.title = this.$lang(data.name_th, data.name_en)
    //     data.path = new URL(data.url).pathname

    //     return data
    //   })
    // },
  },
}
</script>

<style scoped lang="scss">

.header {
  margin: 50px 0 30px;

  .organization-title {
    text-align: center;
    font-size: 36px;
    color: #001538;
  }
}

.content-container {
  width: 70%;
  margin: 0 auto 100px;
  padding: 30px;
  border-radius: 10px;

  .menu-list {
    margin-bottom: 15px;

    .menu {
      color: #fff;
      font-weight: bold;
      font-size: 20px;
    }

    .submenu-list {
      margin-top: 5px;
      margin-left: 10px;
      color: #c4c4c4;

      .submenu {
        color: #c4c4c4;
      }
    }
  }
}
</style>
