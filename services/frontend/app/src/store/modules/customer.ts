import {
  Getters,
  Mutations,
  Actions,
  Module,
  createMapper
} from 'vuex-smart-module'
import ClientAPI from '@/api/client'

export interface FileManual {
  valueAnswer: string
  fileValue: any
}
export interface AddOrder {
  title: string
  description: string
  dataManualFile: any[]
  dataManualText: any[]
  indexManual: number
}

class CustomerState {
  addOrder: any = {
    title: '',
    description: '',
    dataManualFile: [],
    dataManualText: [],
    indexManual: -1,
    answer: ''
  }
  orderList: any[] = []
  orderListStart: any[] = []
  orderListAllUSer: any[] = []
  editOrder: any = null
  flags: any = {
    filechange: null
  }
}

class CustomerGetters extends Getters<CustomerState> {
  // TODO
}

class CustomerMutations extends Mutations<CustomerState> {
  // TODO
  setEditOrder(editOrder: any) {
    this.state.editOrder = editOrder
  }
  setOrderList(orderList: any[]) {
    const newArr: any[] = []
    for (const item in orderList) {
      newArr.push(orderList[item])
    }
    this.state.orderListStart = newArr
    this.state.orderList = newArr
  }
  filterWithTypeOrder(test: string[]) {
    this.state.orderList = this.state.orderListStart
    if (test.length) {
      this.state.orderList = this.state.orderList.filter((val: any) =>
        test.includes(val.data_type)
      )
    }
  }
  filterWithTextOrder(test: string) {
    this.state.orderList = this.state.orderListStart
    if (test !== '') {
      this.state.orderList = this.state.orderList.filter(
        (val: any) => val.title.includes(test) || val.description.includes(test)
      )
    }
  }
  filterWithDateOrder(test: string) {
    this.state.orderList = this.state.orderListStart
    if (test !== '') {
      this.state.orderList = this.state.orderList.filter((val: any) =>
        val.dateCreate.includes(test)
      )
    }
  }
  setOrderListAllUSer(orderList: any[]) {
    this.state.orderListAllUSer = JSON.parse(JSON.stringify(orderList))
  }
  addOrderInList(orderList: any) {
    this.state.orderList = this.state.orderList.concat(orderList)
  }
  setAddOrder(obj: AddOrder) {
    this.state.addOrder = obj
  }
  deleteOrderWithId(id: string) {
    this.state.orderList = this.state.orderList.filter(
      (i: any) => i._id.$oid !== id
    )
  }
}

class CustomerActions extends Actions<
  CustomerState,
  CustomerGetters,
  CustomerMutations,
  CustomerActions
> {
  async fetchAllOrders() {
    try {
      const response = await ClientAPI.getAllOrders()
      this.mutations.setOrderList(response.data) //TODO поменять setOrderListAllUSer setOrderList
    } catch (err) {
      console.error(err)
    }
  }
  async fetchOrdersForUser(id: string) {
    try {
      const response = await ClientAPI.getOrderWithId(id)
      this.mutations.setOrderList(response.data)
    } catch (err) {
      console.error(err)
    }
  }
  async fetchAddOrders(objSend: any) {
    try {
      const response = await ClientAPI.addOrder(objSend)
      this.mutations.addOrderInList({
        ...objSend,
        _id: { $oid: response.data.id }
      })
    } catch (err) {
      console.error(err)
    }
  }
  async fetchAddOrdersPhoto(objSend: any) {
    try {
      let response = await ClientAPI.addOrder(objSend.sendObj)
      this.mutations.addOrderInList({
        ...objSend.sendObj,
        _id: { $oid: response.data.id }
      })
      response = await ClientAPI.addOrderPhoto(
        response.data.id,
        objSend.dataTmp
      )
    } catch (err) {
      console.error(err)
    }
  }
}

export const customer = new Module({
  state: CustomerState,
  getters: CustomerGetters,
  mutations: CustomerMutations,
  actions: CustomerActions
})

export const customerMapper = createMapper(customer)
