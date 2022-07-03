<template>
  <div class="mt-2">
    <div class="registrationButton">
      <b-button
        @click="editProfileClick()"
        class="mr-2 btn-primary-outline"
        variant="info"
      >
        Редактировать профиль
      </b-button>
    </div>
    <div class="p-3">
      <div class="w-60">
        <label for="mailUserPersonal">Почта</label>
        <b-form-input
          id="mailUserPersonal"
          :disabled="isActive"
          v-model="userInfo.email"
          placeholder="Почта"
          trim
        />
      </div>
      <div class="w-60">
        <label for="nameUserPersonal">Имя</label>
        <b-form-input
          id="nameUserPersonal"
          v-model="userInfo.name"
          :disabled="isActive"
          placeholder="Имя"
          trim
        />
      </div>
      <div class="w-60">
        <label for="surnameUserPersonal">Фамилия</label>
        <b-form-input
          id="surnameUserPersonal"
          v-model="userInfo.surname"
          :disabled="isActive"
          placeholder="Фамилия"
          trim
        />
      </div>
      <div class="w-60">
        <label>Заказы:</label>
        <ag-grid-vue
          :columnDefs="columnDefsOrder"
          :gridOptions="gridOptions"
          v-model="orderList"
          class="ag-theme-alpine h-100"
        />
      </div>
    </div>
    <editLk />
    <b-modal
      id="deleteOrderLkModal"
      title="Предупреждение"
      ok-title="Применить"
      cancel-title="Отмена"
      size="lg"
      @ok="deleteClick"
    >
      <div>
        Вы действительно хотите удалить заказ?
      </div>
      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button @click="ok()" variant="info">
          Удалить
        </b-button>
        <b-button @click="cancel()">
          Отмена
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import editLk from '@/components/Modal/lkUser/editLk.vue'
import { userMapper } from '@/store/modules/user'
import { AgGridVue } from 'ag-grid-vue'
import ActionRenderer from '@/components/table/ActionRenderer.vue'
import AgGridFactory from '@/factories/agGridFactory'
import { GridApi } from 'ag-grid-community'
import { customerMapper } from '@/store/modules/customer'
import { clientMapper } from '@/store/modules/client'
import ClientAPI from '@/api/client'

const Mapper = Vue.extend({
  computed: {
    ...userMapper.mapState(['isAuthenticated', 'userInfo', 'userId', 'isWork']),
    ...customerMapper.mapState(['orderList'])
  },
  methods: {
    ...clientMapper.mapMutations(['setSelectOrder']),
    ...customerMapper.mapActions(['fetchAllOrders', 'fetchOrdersForUser']),
    ...clientMapper.mapActions(['fetchFullInfoOrder']),
    ...customerMapper.mapMutations(['deleteOrderWithId'])
  }
})

@Component({
  components: { editLk, AgGridVue, ActionRenderer }
})
export default class ListOrders extends Mapper {
  private gridApi: GridApi | null = null
  private isActive = true
  private onDeleteObj: any = null

  private gridOptions = {
    ...AgGridFactory.getDefaultGridOptions(),
    domLayout: 'autoHeight',
    defaultColDef: {
      autoHeight: true,
      cellStyle: { 'white-space': 'normal' },
      editable: false
    },
    onGridReady: this.onGridReady
  }

  private onGridReady({ api }: { api: any }) {
    this.gridApi = api
  }

  private async deleteClick() {
    this.deleteOrderWithId(this.onDeleteObj._id.$oid)
    await ClientAPI.deleteCustomerOrder(this.onDeleteObj._id.$oid)
    await this.fetchOrdersForUser(this.userId)
  }

  private columnDefsOrder: any[] = []

  private onDelete(value: any) {
    this.$bvModal.show('deleteOrderLkModal')
    this.onDeleteObj = value.data
  }

  private async onRedirect(value: any) {
    this.setSelectOrder(value.data)
    await this.fetchFullInfoOrder(value.data._id.$oid)
    this.$router.push('/main/work/task')
  }

  async created() {
    await this.fetchOrdersForUser(this.userId)
    this.columnDefsOrder = [
      {
        headerName: 'Название',
        field: 'title',
        editable: false,
        width: 150
      },
      {
        headerName: 'Описание',
        field: 'description',
        width: 250
      },
      {
        ...AgGridFactory.getActionColumn({
          cellRendererParams: {
            getActionByType: () => {
              return this.isWork ? ['onRedirect'] : ['onDelete'] //this.editable ? ['onDownload', 'onDelete'] : ['onDownload']
            },
            onDelete: this.onDelete,
            onRedirect: this.onRedirect
          },
          minWidth: 140,
          editable: false,
          maxWidth: 140
        })
      }
    ]
  }

  private editProfileClick() {
    this.$bvModal.show('editLkModal')
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
.agGridDisClass {
  height: 500px;
  overflow: scroll;
}
.registrationButton {
  text-align: right;
}
</style>
