<template>
  <div>
    <DArticleBanner
      :title="$t('MEMBER_GROUP_MEMBER.TITLE')"
      :image="'/images/banner-member-group.png'"
    />

    <v-container>
      <section class="member-container">
        <v-row>
          <v-col cols="12" class="member">
            <h2 class="section-title">
              <span>
                <i
                  class="fa fa-chevron-left"
                  @click="
                    openPage('/member-group/info', {
                      id: member_group_id,
                    })
                  "
                ></i>
                {{ $t('MEMBER_GROUP_MEMBER.HEADER') }}
              </span>
            </h2>

            <v-row>
              <v-col v-for="member of member_list" :key="member.id" cols="4">
                <DMemberGroupMemberCard :data="member" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </section>
    </v-container>
  </div>
</template>

<script>
  import DArticleBanner from '~/components/desktop/shared/DArticleBanner.vue'
  import DMemberGroupMemberCard from '~/components/desktop/member-group/DMemberGroupMemberCard.vue'

  export default {
    name: 'DMemberGroup',
    components: {
      DArticleBanner,
      DMemberGroupMemberCard,
    },
    data() {
      return {
        member_group_id: this.$route.query.member_group_id,
        member_list: [],
      }
    },
    async mounted() {
      await this.getMember()
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
    padding: 25px 0 150px;
  }
</style>
