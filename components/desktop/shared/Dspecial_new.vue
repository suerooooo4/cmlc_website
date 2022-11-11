<template>
    <div>
        <v-card class="back_color">

            <img class="with-img" src="../../../static/images/Dspic.png" alt="">
            <v-card-text>
                <p class="text-center">ศูนย์การเรียนรู้สื่อชุมชน มหาวิทยาลัยพะเยา ชวนนักแต่งเพลง นักดนตรี Producer
                    นักร้อง นักศึกษา และ ผู้ที่ต้องการ
                    Up-skill การแต่งเพลงและผลิตมิวสิควิดีโอ กับ 3 วิทยากรมากความสามารถด้านดนตรี อาจารย์ติ๊ด-โสฬส
                    ปุณกะบุตร,
                    อาจารย์ชิ-ผศ.ดร. สุวิชาน พัฒนาไพรวัลย์ และคุณเชวง ไชยวรรณ ผู้กำกับภาพยนตร์สั้นเจ้าของ 2
                    รางวัลจากเทศกาล
                    19th International Festival Signs of the Night - Berlin (7th Edition) และ Tokyo International Short
                    Film Festival 2021 ในการอบรมเชิงปฏิบัติการ “การสร้างสรรค์เพลงจากเรื่องเล่าของชุมชน (The Local
                    Rhythm)”
                </p>
            </v-card-text>
            <v-card class="p-4">
                <div class="gray_area">
                    <div>
                        <h3 class="text-center-crad">ค่าฝึกอบรมฯ ตลอด 30 ชั่วโมงรวมที่พัก และอาหาร สุดคุ้ม เพียง 3,000 บาท
                            สมัครและลงทะเบียนด่วนวันนี้จนถึง 10 กรกฏาคม 2565 รับจำนวนจำกัดไม่เกิน 20 คน เท่านั้น
                        </h3>
                    </div>
                    <div class="flex-btn">
                        <v-btn color="#EFB008" class="padding" dark v-bind="attrs"
                            href="https://docs.google.com/forms/d/e/1FAIpQLSfY1ImxguZAIYrZw2pBVR_3VL8k9LwOS-MrZaB5agI7riA8BQ/viewform"
                            target="_blank" v-on="on">
                            สมัครลงทะเบียน
                        </v-btn>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <v-btn color="#001538" class="padding" dark v-bind="attrs" v-on="on" @click="closeForm(false)">
                            เข้าสู่เว็บไซต์
                        </v-btn>
                    </div>
                </div>
                <div class="flex-footter">
                    <p class="footter">ขอรายละเอียดเพื่มเติมได้ทาง ศูนย์เรียนรู้สื่อชุมชน <br />
                        Community Media Learning Center <br />หรือโทรศัพท์ 095 447 1842</p>
                </div>
            </v-card>
        </v-card>

    </div>
</template>

<script>
import DRegister from '~/components/desktop/shared/DRegister.vue'
import DLogin from '~/components/desktop/shared/DLogin.vue'
export default {
    components: {
        DRegister,
        DLogin,
    },
    name: 'Dspecial_new',
    data() {
        return {
            register_dialog: false,
            login_dialog: false,
        }
    },
    methods: {
        closeForm(value) {
            this.$emit('speci_dialog', value)
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

.flex-footter {
    position: relative;
    width: 100%;
    display: flex;
    justify-self: center;
    align-items: center;
    justify-content: center;
}

.footter {
    position: relative;
    width: 100%;
    padding: 10px;
    font-family: 'Prompt';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: #001538;
    top: 5px;
}

.back_color {
    position: relative;
    display: block;
    width: 100%;
}

.padding {
    padding-left: 20px;
}

.with-img {
    position: relative;
    display: block;
    width: 100%;
}

.gray_area{
  background-color: #F4F4F4;
  width: 100%;
  padding: 20px;
}

.flex-btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px;
}

.p-4 {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-right: 30px;
    padding-left: 30px;
    margin-top: -50px;
}

.text-center-crad {
    padding: 20px;
    color: #001538;
    font-family: 'Prompt';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 30px;
    text-align: center;
    margin-top: -25px;

}

.end_card {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 5px;
}

.text-center {
    text-align: center;
    color: #001538;
    margin: 15px 0;
    line-height: 30px;
    padding: 20px;
    font-weight: 400;
    font-size: 16px;
    line-height: 27px;
    margin-top: -20px;

}
</style>
