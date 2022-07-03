<template>
  <div class="authCard">
    <div class="w-100 p-2">
      <label for="nameUserAuth">Email</label>
      <b-form-input
        id="nameUserAuth"
        @input="onChangeField"
        v-model="authData.login"
        :state="checkEmail()"
        placeholder="Почта"
        trim
      />
    </div>
    <div class="w-100 p-2">
      <label for="surnameUserAuth">Пароль</label>
      <b-form-input
        id="surnameUserPersonal"
        type="password"
        @input="onChangeField"
        v-model="authData.password"
        :state="!!authData.password.length"
        placeholder="Пароль"
        trim
      />
    </div>
    <div class="d-flex authButton mt-2">
      <b-button
        :disabled="!allFill"
        @click="loginClick()"
        class="mr-2 btn-primary-outline"
        variant="secondary"
      >
        Вход
      </b-button>
      <b-button
        @click="registrationClick()"
        class="mr-2 btn-primary-outline"
        variant="secondary"
      >
        Регистрация
      </b-button>
    </div>
    <!--<b-link class="authLink" href="/main">Забыли пароль?</b-link>-->
    <div v-if="isBadAuth" style="text-align: center; color: red;">
      Неправильный адрес электронной почты или пароль!
    </div>
    <Registration />
    <br />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Registration from '@/components/Modal/Auth/Registration.vue'
import { checkEmail } from '@/utils/fieldValidation'
import { userMapper } from '@/store/modules/user'
import { toastMapper } from '@/store/modules/toast'

const Mapper = Vue.extend({
  computed: {
    ...userMapper.mapState(['userInfo', 'isBadAuth'])
  },
  methods: {
    ...userMapper.mapActions(['fetchLoginUser']),
    ...toastMapper.mapActions(['pushToast'])
  }
})

@Component({
  components: {
    Registration
  }
})
export default class Auth extends Mapper {
  private allFill = false
  private authData = {
    login: '', //'test1@mail.ru',
    password: '' //'test'
  }

  private checkEmail() {
    return checkEmail(this.authData.login)
  }

  async created() {
    this.onChangeField()
  }
  private onChangeField() {
    this.allFill = this.checkEmail() && this.authData.password !== ''
  }
  private registrationClick() {
    this.$bvModal.show('registrationModal')
  }
  private async loginClick() {
    const objReq: any = {
      email: this.authData.login,
      password: this.authData.password
    }
    this.userInfo.email = this.authData.login
    await this.fetchLoginUser(objReq)
    this.$router.push('/main/work')
  }
}
</script>

<style lang="scss" scoped>
.authCard {
  border: solid black 1px;
  width: 40%;
  margin-left: 30%;
  margin-right: 30%;
}
.authButton {
  width: 20%;
  margin-left: 40%;
  margin-right: 40%;
}
.authLink {
  width: 15%;
  margin-left: 45%;
}
</style>
