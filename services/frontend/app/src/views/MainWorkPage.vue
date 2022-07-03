<template>
  <div class="ml-5">
    <div v-if="isAdmin" class="adminButton">
      <b-button class="mr-1 w-30" @click="exportBD()" variant="info">
        Экспортировать данные БД
      </b-button>
      <div class="mt-5">
        <div style="display: flex;">
          <b-button
            class="mr-1 w-30"
            @click="importBD()"
            :disabled="!importBDFile"
            variant="info"
          >
            Импортировать данные БД
          </b-button>
        </div>
        <div>
          <b-form-file
            v-model="importBDFile"
            id="fileBDUpload"
            placeholder="Загрузите файл"
            class="w-30"
          />
        </div>
      </div>
    </div>
    <div v-if="!isAdmin">
      <div>
        <h5>Фильтры</h5>
        <div class="d-flex mb-4 filterDivCatalog">
          <div class="ml-1 w-25">
            <label for="filterTaskText">Поиск по заданиям</label>
            <b-form-input
              id="filterTaskText"
              v-model="filtersTaskText"
              @input="findWithText"
              placeholder="Текст или название задачи"
              trim
            />
          </div>
          <div v-if="!isWork" class="ml-1 w-25">
            <label for="filterTaskText">Поиск по дате</label>
            <b-form-input
              id="filterTaskText"
              v-model="filtersTaskText"
              @input="findWithDate"
              placeholder="Дата создания"
              type="date"
              trim
            />
          </div>
          <div v-if="isWork" class="ml-1 w-15">
            <label for="filterTypeTask">Тип задания</label>
            <b-form-checkbox-group
              id="filterTypeTask"
              v-model="checkFiltersTypeTask"
              :options="filtersTypeTask"
              @change="findwWithType"
              name="flavour-2a"
              stacked
            ></b-form-checkbox-group>
          </div>
          <!--<div v-if="isWork" class="ml-1 w-15">
            <label for="filterCustomer">Заказчики</label>
            <b-form-checkbox-group
              id="filterCustomer"
              v-model="checkFiltersCustomer"
              :options="filtersCustomer"
              name="flavour-2a"
              stacked
            ></b-form-checkbox-group>
          </div>-->
        </div>
      </div>
      <div v-if="!isWork" class="addOrderClass">
        <b-button class="mr-1" @click="addOrderClick()" variant="info">
          Добавить заказ
        </b-button>
      </div>
      <div class="mt-4 catalogList">
        <div v-for="(product, index) of orderList" :key="index">
          <OrderCard class="mt-1" :product="product" />
        </div>
      </div>
      <br />
      <AddOrderModal />
      <EditOrderModal />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Config from '@/config/config'
import OrderCard from '@/components/help/OrderCard.vue'
import { clientMapper } from '@/store/modules/client'
import AddOrderModal from '@/components/Modal/Customer/AddOrderModal.vue'
import { userMapper } from '@/store/modules/user'
import { customerMapper } from '@/store/modules/customer'
import EditOrderModal from '@/components/Modal/Customer/EditOrderModal.vue'
import AdminAPI from '@/api/admin'
import moment from 'moment'

const Mappers = Vue.extend({
  computed: {
    ...clientMapper.mapState([]),
    ...userMapper.mapState(['isAuthenticated', 'isWork', 'userId', 'isAdmin']),
    ...customerMapper.mapState(['orderList'])
  },
  methods: {
    ...customerMapper.mapMutations([
      'filterWithTextOrder',
      'filterWithTypeOrder',
      'filterWithDateOrder'
    ]),
    ...customerMapper.mapActions(['fetchAllOrders', 'fetchOrdersForUser'])
  }
})

@Component({
  components: {
    OrderCard,
    AddOrderModal,
    EditOrderModal
  }
})
export default class MainWorkPage extends Mappers {
  private filtersTaskText = ''
  private filtersTaskDate = ''
  private importBDFile: any = null
  private filtersTypeTask = Config.typeTask
  private filtersCustomer = Config.customers
  private checkFiltersTypeTask = []
  private checkFiltersCustomer = []

  private addOrderClick() {
    this.$bvModal.show('addOrderModal')
  }

  private findWithText(value: any) {
    this.filterWithTextOrder(value)
  }

  private findWithDate(value: any) {
    this.filterWithDateOrder(moment(value).format('DD.MM.YYYY'))
  }

  private findwWithType(value: any) {
    const arrFilter: string[] = []
    if (value.includes(this.filtersTypeTask[3])) {
      arrFilter.push('text')
      arrFilter.push('photo')
    } else {
      if (value.includes(this.filtersTypeTask[1])) {
        arrFilter.push('text')
      }
      if (value.includes(this.filtersTypeTask[0])) {
        arrFilter.push('photo')
      }
    }
    this.filterWithTypeOrder(arrFilter)
  }

  async created() {
    if (!this.isAdmin) {
      !this.isWork
        ? await this.fetchOrdersForUser(this.userId)
        : await this.fetchAllOrders()
      for (const item of this.orderList) {
        item.dateCreate = moment(item.dateCreate, 'MM.DD.YYYY').format(
          'DD.MM.YYYY'
        )
      }
    }
  }

  private async exportBD() {
    AdminAPI.exportBD()
  }

  private importBD() {
    AdminAPI.importBD(this.importBDFile)
  }
}
</script>

<style lang="scss" scoped>
.swiper-size {
  height: 30%;
  display: flex;
}
.textMainView {
  font-size: 18px;
}
.catalogList {
  height: 70vh;
  overflow: scroll;
  overflow-x: hidden;
}
.addOrderClass {
  text-align: right;
}
.adminButton {
  margin-top: 10%;
  margin-left: 40%;
}
</style>
