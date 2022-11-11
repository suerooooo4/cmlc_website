<template>
  <div>
    <DArticleBanner
      :title="$t('MEMBER_GROUP.TITLE')"
      :image="'/images/banner-member-group.png'"
    />

    <section class="member-group-container">
      <v-container>
        <h2 class="member-group-title">
          {{ $t('MEMBER_GROUP.HEADER') }}
        </h2>

        <div class="member-group-content">
          <div class="member-group-list">
            <h2 class="list-title">
              {{ $t('MEMBER_GROUP.GROUP') }}
            </h2>

            <v-row class="pl-4 pr-4">
              <v-col
                class="pa-2"
                cols="6"
                v-for="group of member_group"
                :key="group.id"
              >
                <v-card
                  class="mx-auto member-group hover-card"
                  @click="openPage('member-group/info', { id: group.id })"
                >
                  <v-img
                    height="150"
                    :src="`${image_url}${group.image}`"
                  ></v-img>
                  <div class="group-info text-center">
                    <div class="group-name">
                      <h3>{{ $lang(group.name_th, group.name_en) }}</h3>
                    </div>

                    <div class="group-address pb-2">
                      {{ $lang(group.address_th, group.address_en) }}
                    </div>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </div>

          <div class="location-container">
            <GmapMap
              :center="gmap.center"
              :zoom="7"
              class="location-map"
              v-if="gmap.markers.length > 0"
            >
              <GmapMarker
                :key="index"
                v-for="(m, index) in gmap.markers"
                :position="m.position"
                :clickable="true"
                :draggable="false"
                @click="openWindow($event, index)"
              />
              <GmapInfoWindow
                @closeclick="gmap.window_open = false"
                :opened="gmap.window_open"
                :position="gmap.infowindow"
                :options="{
                  pixelOffset: {
                    width: 0,
                    height: -35,
                  },
                }"
              >
                <v-img
                  width="150"
                  height="150"
                  :src="`${image_url}${gmap.image}`"
                ></v-img>
                <div class="group-info text-center">
                  <div class="group-name pt-2">
                    <a
                      v-if="gmap.info_url"
                      :href="gmap.info_url"
                      target="_blank"
                      >{{ gmap.info_marker }}</a
                    >
                    <span v-else>{{ gmap.info_marker }}</span>
                  </div>

                  <div class="group-address">
                    {{ gmap.address }}
                  </div>
                </div>
              </GmapInfoWindow>
            </GmapMap>
          </div>
        </div>
        <div v-if="total" class="pagination float-left">
              <v-pagination 
                v-model="page"
                @input="changePage()"
                :length="last_page"
                :total-visible="7"
              ></v-pagination>
      </div>
      </v-container>
    </section>
  </div>
</template>

<script>
  import DArticleBanner from '~/components/desktop/shared/DArticleBanner.vue'

  export default {
    name: 'DMemberGroup',
    components: {
      DArticleBanner,
    },
    data() {
      return {
        page:1,
        per_page: 4,
        last_page: 0,
        total: 0,
        image_url: process.env.image_url,
        member_group: [],
        gmap: {
          center: { lat: Number(11.0), lng: Number(11.0) },
          markers: [],
          info_marker: null,
          infowindow: { lat: Number(11.0), lng: Number(11.0) },
          window_open: false,
          info_url: null,
          image: '',
          address: '',
        },
      }
    },
    async mounted() {
      await this.getMemberGroup()
    },
    methods: {
      async changePage() {
        this.openPage('', {
          page: this.page,  
        })
        await this.getMemberGroup()
      },
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
      async getMemberGroup() {
      let res = await this.$store.dispatch('member_group/pagination', {
        page: this.page,
        perPage: this.per_page,
        orderBy: 'created_at',
        isDesc: true,
      })

      this.member_group = res.data.data.map((data) => {
        data.detail_th = this.$stripHtml(data.detail_th)
        data.detail_en = this.$stripHtml(data.detail_en)
        return data
      })
      this.last_page = res.data.lastPage
      this.total = res.data.total
      this.setMap()
    },
      setMap() {
        for (const member_group of this.member_group) {
          this.gmap.markers.push({
            id: member_group.id,
            position: {
              lat: Number(member_group.location_lat),
              lng: Number(member_group.location_lng),
            },
          })
        }

        this.gmap.center = this.gmap.markers[0].position
        this.gmap.infowindow = this.gmap.markers[0].position
      },
      openWindow(e, index) {
        this.gmap.info_marker = this.$lang(
          this.member_group[index].name_th,
          this.member_group[index].name_en
        )
        this.gmap.info_url = this.member_group[index].url
        this.gmap.infowindow = e.latLng
        this.gmap.window_open = true
        this.gmap.image = this.member_group[index].image
        this.gmap.address = this.$lang(
          this.member_group[index].address_th,
          this.member_group[index].address_en
        )
      },
    },
  }
</script>

<style scoped lang="scss">
  .member-group-container {
    padding: 25px 0 50px;

    .member-group-title {
      margin: 30px 0 60px;
      font-size: 36px;
      text-align: center;
    }

    .member-group-content {
      // padding: 15px 15px 10px 0;
      display: flex;
      box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.25);
      border-radius: 10px;

      .member-group-list {
        width: 400px;
        height: 600px;
        // margin-right: 5px;
        background: #f8f7f6;
        border-radius: 10px;

        .list-title {
          padding: 10px 15px 25px;
          text-align: center;
          font-size: 28px;
        }

        .list-container {
          height: 520px;
          overflow-y: scroll;

          .member-group {
            margin: 0 15px 15px;
            padding: 15px;
            background: #f2f2f2;
            border-radius: 10px;
            display: flex;
            align-items: center;
            cursor: pointer;

            .group-image {
              img {
                width: 40px;
                height: 40px;
                border-radius: 100%;
                object-fit: cover;
                object-position: center;
              }
            }

            .group-info {
              padding-left: 15px;

              .group-name {
                margin-bottom: 5px;
                font-weight: bold;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                color: #001538;
              }

              .group-address {
                margin-bottom: 5px;
                font-size: 12px;
                color: #b2b2b2 !important;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
              }
            }
          }
        }
      }

      .location-container {
        width: 100%;
        // margin-left: 10px;

        .location-map {
          width: 100%;
          height: 600px;
          border-radius: 4px;
          border: 1px solid #fff;
        }
      }
    }
  }
  .group-address {
    color: #b2b2b2 !important;
  }
  .member-group {
    border-radius: 10px;
  }
</style>
