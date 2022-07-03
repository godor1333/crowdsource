import Vue from 'vue'
import VueI18n from 'vue-i18n'

import tableRU from './ru_table'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'ru',
  messages: {
    ru: {
      ...tableRU
    }
  }
})

export default i18n
