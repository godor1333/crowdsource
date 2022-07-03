import Vue from 'vue'
import Vuex from 'vuex'

import { Module, createStore } from 'vuex-smart-module'
import { client } from '@/store/modules/client'
import { customer } from '@/store/modules/customer'
import { user } from '@/store/modules/user'
import { toast } from '@/store/modules/toast'

Vue.use(Vuex)

const root = new Module({
  modules: {
    client,
    customer,
    user,
    toast
  }
})

export default createStore(root)
