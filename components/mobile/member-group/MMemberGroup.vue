<template>
  <main>
    <MArticleBanner
      :title="$t('MEMBER_GROUP.TITLE')"
      :image="'/images/banner-member-group.png'"
    />
    <section class="latest">
      <h1 class="latest__title">{{ $t('MEMBER_GROUP.HEADER') }}</h1>
    </section>
    <section class="map">
      <GmapMap
        :center="gmap.center"
        :zoom="7"
        style="width: 100%; height: 300px"
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
          <v-img width="100" height="100" :src="`${image_url}${gmap.image}`" />
          <div class="group-info text-center">
            <div class="group-name pt-2">
              <a v-if="gmap.info_url" :href="gmap.info_url" target="_blank">{{
                gmap.info_marker
              }}</a>
              <span v-else>{{ gmap.info_marker }}</span>
            </div>

            <div class="group-address">{{ gmap.address }}</div>
          </div>
        </GmapInfoWindow>
      </GmapMap>
      <div class="member-group-list">
        <h2 class="list-title">
          {{ $t('MEMBER_GROUP.GROUP') }}
        </h2>

        <div class="list-container fixed-overflow">
          <div
            v-for="group of member_group"
            :key="group.id"
            @click="openPage('member-group/info', { id: group.id })"
            class="member-group"
          >
            <div class="group-image">
              <img
                :src="`${image_url}${group.image}`"
                alt="member-group-image"
              />
            </div>

            <div class="group-info">
              <p class="group-name">
                {{ $lang(group.name_th, group.name_en) }}
              </p>

              <p class="group-address">
                {{ $lang(group.address_th, group.address_en) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
  import MArticleBanner from '~/components/mobile/shared/MArticleBanner.vue'
  export default {
    name: 'MMemberGroup',
    components: {
      MArticleBanner,
    },
    data() {
      return {
        image_url: process.env.image_url,
        member_group: [],
        gmap: {
          center: { lat: Number(11.0), lng: Number(11.0) },
          markers: [],
          info_marker: null,
          infowindow: { lat: Number(11.0), lng: Number(11.0) },
          window_open: false,
          info_url: null,
        },
      }
    },
    mounted() {
      this.getMemberGroup()
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
      async getMemberGroup() {
        let res = await this.$store.dispatch('member_group/get')
        this.member_group = res.data
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
  .latest {
    width: 100vw;
    margin-top: 13px;
    margin-left: -12px;
    text-align: center;
    &__title {
      padding-top: 15px;
      font-size: 20px;
    }

    &__detail {
      font-size: 12px;
      padding: 0px 20px;
    }
  }
  .map {
    margin: 15px;
    font-size: 12px;

    &__google {
      width: 100%;
      height: 400px;
      border-radius: 4px;
      border: 1px solid #fff;
    }
    .member-group-list {
      width: 100%;
      height: 600px;
      margin-top: -9px;
      margin-right: 5px;
      border-radius: 10px;
      background: #ffffff;
      box-shadow: 1px 1px 5px -1px rgba(0, 0, 0, 0.2);

      .list-title {
        padding: 10px 15px 25px;
        text-align: center;
        font-size: 20px;
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
            }

            .group-address {
              margin-bottom: 5px;
              font-size: 12px;
              color: #b2b2b2;
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
  }
</style>
