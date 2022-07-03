import {
  Getters,
  Mutations,
  Module,
  createMapper,
  Actions
} from 'vuex-smart-module'

class ToastState {
  count = 0
  toasts: any[] = []
}

class ToastGetters extends Getters<ToastState> {
  get toasts() {
    return this.state.toasts
  }
  get count() {
    return this.state.count
  }
}

class ToastMutations extends Mutations<ToastState> {
  pushToast(toast: any) {
    this.state.toasts.push(toast)
  }

  spliceToast(id: number) {
    this.state.toasts = this.state.toasts.filter(p => p.id !== id)
  }

  incCount() {
    this.state.count++
  }
}

class ToastActions extends Actions<
  ToastState,
  ToastGetters,
  ToastMutations,
  ToastActions
> {
  async pushToast(toast: any) {
    toast.id = this.state.count
    this.commit('incCount')
    this.commit('pushToast', toast)
  }
  async delToast(id: number) {
    this.commit('spliceToast', id)
  }
}

export const toast = new Module({
  state: ToastState,
  getters: ToastGetters,
  mutations: ToastMutations,
  actions: ToastActions
})

export const toastMapper = createMapper(toast)
