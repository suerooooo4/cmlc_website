<template>
  <main>
    <MArticleBanner
      :title="$t('MEMBER_GROUP.TITLE')"
      :image="'/images/banner-member-group.png'"
    />
    <section class="member-container">
      <v-container>
        <header class="header">
          <span class="header__topbar mt-4">
            <v-btn
              icon
              @click="
                openPage('/member-group/info', {
                  id: member_group_id,
                })
              "
            >
              <i class="back"></i>
            </v-btn>
            <a
              class="link"
              @click="
                openPage('/member-group/info', {
                  id: member_group_id,
                })
              "
              >{{ $t('MEMBER_GROUP_MEMBER.HEADER') }}&nbsp;&nbsp;&nbsp;</a
            >
          </span>
          <hr />
        </header>

        <v-row>
          <v-col v-for="member of member_list" :key="member.id" cols="6">
            <MMemberGroupMemberCard
              :data="member"
              :detail_path="'/member-group/portfolio-detail'"
            />
          </v-col>
        </v-row>
      </v-container>
    </section>
  </main>
</template>

<script>
  import MArticleBanner from '~/components/mobile/shared/MArticleBanner.vue'
  import MMemberGroupMemberCard from '~/components/mobile/member-group/MMemberGroupMemberCard.vue'
  export default {
    name: 'MMemberGroupMember',
    components: {
      MArticleBanner,
      MMemberGroupMemberCard,
    },
    data() {
      return {
        member_group_id: this.$route.query.member_group_id,
        member_list: [],
      }
    },
    mounted() {
      this.getMember()
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
      async getMember() {
        let res = await this.$store.dispatch(
          'member_group_member/get',
          this.member_group_id
        )

        this.member_list = res.data
      },
    },
  }
</script>

<style scoped lang="scss">
  .member-container {
    padding: 10px 0;
    .header {
      margin-bottom: 15px;
      &__topbar {
        color: #001538;
        position: relative;

        &:after {
          content: '';
          display: block;
          width: 100%;
          height: 6px;
          border-radius: 6px;
          background: #000;
          position: absolute;
          bottom: -11px;
          left: 0;
        }
        .link {
          color: #001538;
        }
      }
      hr {
        display: block;
        height: 1px;
        border: 0;
        border-top: 2px solid #ccc;
        padding: 0;
      }
    }
  }
</style>
