<template>
  <div>
    <b-modal
      id="registrationModal"
      title="Регистрация"
      size="lg"
      @ok="logInClick"
      @show="openFuc"
    >
      <label for="mailUserRegistr">Почта</label>
      <b-form-input
        id="mailUserRegistr"
        :disabled="isActive"
        :state="checkEmail()"
        v-model="userInfoObj.email"
        @input="onChangeField"
        placeholder="Почта"
        trim
      />
      <label for="nameUserRegistration">Имя</label>
      <b-form-input
        id="nameUserRegistration"
        @input="onChangeField"
        :disabled="isActive"
        :state="!!userInfoObj.name.length"
        v-model="userInfoObj.name"
        placeholder="Имя"
        trim
      />
      <label for="nameUserRegistration">Фамилия</label>
      <b-form-input
        id="surnameUserRegistration"
        @input="onChangeField"
        :disabled="isActive"
        v-model="userInfoObj.surname"
        :state="!!userInfoObj.surname.length"
        placeholder="Фамилия"
        trim
      />
      <b-form-radio-group
        id="radio-group-1"
        v-model="userInfoObj.type"
        :state="!!userInfoObj.type.length"
        @change="changeType"
        @input="onChangeField"
        name="radio-sub-component"
      >
        <b-form-radio value="work">Исполнитель</b-form-radio>
        <b-form-radio value="customer">Заказчик</b-form-radio>
      </b-form-radio-group>
      <div v-if="isCustomer">
        <label for="orgUserRegistration">Организация</label>
        <b-form-input
          id="orgUserRegistration"
          @input="onChangeField"
          :state="!!userInfoObj.customer.length"
          v-model="userInfoObj.customer"
          :disabled="isActive"
          placeholder="Организация"
          trim
        />
      </div>
      <label for="passwordRegistrInput">Пароль</label>
      <b-form-input
        id="passwordRegistrInput"
        type="password"
        @input="onChangeField"
        :state="!!userInfoObj.password.length"
        v-model="userInfoObj.password"
        trim
      />
      <label for="passwordRegistrInputComfirm">Подтверждение пароля</label>
      <b-form-input
        id="passwordRegistrInputComfirm"
        type="password"
        @input="onChangeField"
        :state="
          !!userInfoObj.passwordAcc.length &&
            userInfoObj.password === userInfoObj.passwordAcc
        "
        v-model="userInfoObj.passwordAcc"
        trim
      />
      <div
        style="color: red;"
        v-if="userInfoObj.password !== userInfoObj.passwordAcc"
      >
        Пароли не совпадают!
      </div>
      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button @click="ok()" :disabled="!allFill" variant="secondary">
          Зарегистроваться
        </b-button>
        <b-button @click="cancel()" variant="secondary">
          Закрыть
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AwesomeMask from 'awesome-mask'
import { checkEmail } from '@/utils/fieldValidation'
import { userMapper } from '@/store/modules/user'

export enum modalAction {
  create = 'Создание',
  edit = 'Редактирование'
}

const Mappers = Vue.extend({
  computed: {
    ...userMapper.mapState(['userInfo'])
  },
  methods: {
    ...userMapper.mapActions(['fetchRegisterUser'])
  }
})

@Component({
  directives: {
    mask: AwesomeMask
  }
})
export default class Registration extends Mappers {
  private allFill = false
  private isCustomer = false
  private isActive = false
  private isEdit = false
  private userInfoObj = {
    email: '',
    name: '',
    surname: '',
    type: '',
    password: '',
    passwordAcc: '',
    customer: ''
  }

  private async logInClick() {
    const objReq: any = {
      email: this.userInfoObj.email,
      name: this.userInfoObj.name,
      type: this.userInfoObj.type,
      password: this.userInfoObj.password
    }
    if (this.userInfoObj.surname) {
      objReq.surname = this.userInfoObj.surname
    }
    if (this.userInfoObj.customer) {
      objReq.customer = this.userInfoObj.customer
    }
    this.userInfo.email = this.userInfoObj.email
    this.userInfo.name = this.userInfoObj.name
    this.userInfo.surname = this.userInfoObj.surname
    this.userInfo.type = this.userInfoObj.type
    this.userInfo.customer = this.userInfoObj.customer
    await this.fetchRegisterUser(objReq)
    this.$router.push('/main/work')
  }

  private changeType(event: any) {
    this.isCustomer = event === 'customer'
  }

  private checkEmail() {
    return checkEmail(this.userInfoObj.email)
  }

  private openFuc() {
    //as
  }

  private onChangeField() {
    let flagOrganization = true
    if (this.isCustomer) {
      flagOrganization = this.userInfoObj.customer !== ''
    }
    this.allFill =
      flagOrganization &&
      this.userInfoObj.email !== '' &&
      this.userInfoObj.name !== '' &&
      this.userInfoObj.surname !== '' &&
      this.userInfoObj.type !== '' &&
      this.userInfoObj.password !== '' &&
      this.userInfoObj.passwordAcc !== '' &&
      this.userInfoObj.password === this.userInfoObj.passwordAcc &&
      this.checkEmail()
  }

  private async created() {
    /**/
  }
}
</script>

<style lang="scss">
.divFilter {
  width: 30%;
  padding: 5px;
}
.mainDivFilter {
  display: flex;
}
label {
  margin-bottom: 0;
  margin-top: 5px;
}
</style>
