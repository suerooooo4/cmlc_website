<template>
  <div>
    <v-card class="back_color">
      <v-card-text>
        <h1 class="text-center">
          สิทธิพิเศษของสมาชิกเว็บไซต์ศูนย์เรียนรู้สื่อชุมชน
        </h1>
        <p>1. เข้ารับการอบรมตามหลักสูตรต่าง ๆ</p>
        <p>2. เข้าร่วมงานประชุมสัมมนา</p>
        <p>3. ยืมอุปกรณ์สำหรับการจัดทำสื่อ</p>
        <p>4. จองใช้ห้องสตูดิโอสำหรับการถ่ายทำรายการ</p>
        <p>5. จองที่ปรึกษาเพื่อการจัดทำสื่อ</p>
        <p>6. ดาวน์โหลดเอกสารและคลิปจากเว็บไซต์</p>
        <p>7. เผยแพร่ผลงานของท่านผ่านเว็บไซต์</p>
        <p>8. แลกเปลี่ยนเรียนรู้เนื้อหาที่น่าสนใจเกี่ยวกับการจัดทำสื่อ</p>
        <p>9. รับทราบข้อมูลที่เกี่ยวข้องกับการจัดทำสื่อ</p>
        <div class="end_card">
          <a @click="openRegister()" class="color_btn">
            <i class="fa fa-user"></i>
            {{ $t('SHARED.REGISTER.NAME') }}
          </a>
          &nbsp;&nbsp;&nbsp;
          <a @click="openLogin()" class="color_btn">
            <i class="fa fa-lock"></i>
            {{ $t('SHARED.LOGIN.NAME') }}
          </a>
          <v-btn
            depressed
            plain
            class="color_btn"
            large
            @click="closeForm(false)"
            >{{ $t('SHARED.REGISTER.INPUT.CANCEL') }}</v-btn
          >
        </div>
      </v-card-text>
    </v-card>
    <v-dialog v-model="register_dialog" persistent max-width="700">
      <MRegister @register_dialog="closeRegisterModal" />
    </v-dialog>
    <v-dialog v-model="login_dialog" persistent max-width="700">
      <MLogin @login_dialog="closeLoginModal" />
    </v-dialog>
  </div>
</template>

<script>
import MRegister from '~/components/mobile/shared/MRegister.vue'
import MLogin from '~/components/mobile/shared/MLogin.vue'
export default {
  components: {
    MRegister,
    MLogin,
  },
  name: 'Mspecial',
  data() {
    return {
      register_dialog: false,
      login_dialog: false,
    }
  },
  methods: {
    closeForm(value) {
      this.$emit('speci_dialog_regi', value)
    },
    openLogin() {
      this.login_dialog = true
    },
    closeLoginModal(value = false) {
      this.login_dialog = false

      if (value) {
        this.register_dialog = true
      }
    },
    openRegister() {
      this.register_dialog = true
    },
    closeRegisterModal(value = false) {
      this.register_dialog = false

      if (value) {
        this.login_dialog = true
      }
    },
  },
}
</script>

<style scoped lang="scss">
.back_color {
  background-color: #001538;
}
.end_card {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px;
}
.text-center {
  line-height: 30px;
  text-align: center;
  margin: 15px 0;
  color: white;
  margin-bottom: 30px;
}
p {
  margin-left: 1rem;
  font-size: 16px;
  line-height: 17px;
  color: white;
}
.color_btn {
  color: white;
}
</style>
