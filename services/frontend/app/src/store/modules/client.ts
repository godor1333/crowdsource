import {
  Getters,
  Mutations,
  Actions,
  Module,
  createMapper
} from 'vuex-smart-module'
import ClientAPI from '@/api/client'

class ClientState {
  selectOrder: any = null
  fullInfoOrder: any = null
  viewOrderPage: any = {
    pairs: []
  }
  allFilled = false
}

class ClientGetters extends Getters<ClientState> {
  // TODO
}

class ClientMutations extends Mutations<ClientState> {
  // TODO
  setFullInfoOrder(fullInfoOrder: any) {
    this.state.fullInfoOrder = fullInfoOrder
  }
  setSelectOrder(selectOrder: any) {
    this.state.selectOrder = selectOrder
  }
  checkFill() {
    let success = true
    for (const item of this.state.viewOrderPage.pairs) {
      if (item.first) {
        if (item.first.selected === '') {
          success = false
          break
        }
      }
      if (item.second) {
        if (item.second.selected === '') {
          success = false
          break
        }
      }
    }
    this.state.allFilled = success
  }
}

class ClientActions extends Actions<
  ClientState,
  ClientGetters,
  ClientMutations,
  ClientActions
> {
  async fetchFullInfoOrder(id: string) {
    try {
      const response = await ClientAPI.getFullInfoOrder(id)
      this.mutations.setFullInfoOrder(response.data)
    } catch (err) {
      console.error(err)
    }
  }
}

export const client = new Module({
  state: ClientState,
  getters: ClientGetters,
  mutations: ClientMutations,
  actions: ClientActions
})

export const clientMapper = createMapper(client)
