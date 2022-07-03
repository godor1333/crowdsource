<template>
  <div class="menu mt-3 mb-2">
    <b-navbar class="classMainLine" type="dark" variant="primary" sticky>
      <div
        v-if="!isAuthenticated"
        @click="$router.push('/main')"
        class="mr-2 fa-2x navbarClass"
      >
        <b>CrowdSource</b>
      </div>
      <div
        v-if="isAuthenticated"
        @click="$router.push('/main/work')"
        class="mr-2 fa-2x navbarClass"
      >
        <b>CrowdSource</b>
      </div>
      <b-navbar-brand href="#"> </b-navbar-brand>
      <!--<b-button
        @click="$router.push('/main/work')"
        class="mr-2 btn-primary-outline"
        v-if="isAuthenticated"
      >
        Рабочая страница
      </b-button>-->
      <div class="registrationButton">
        <b-button
          @click="$router.push('/userlk')"
          class="mr-2 btn-primary-outline"
          v-if="isAuthenticated"
          title="Личный кабинет"
        >
          {{ name }}
          <font-awesome-icon :icon="['fa', 'user-circle']" />
        </b-button>
        <b-button
          @click="exit()"
          class="mr-2 btn-primary-outline"
          title="Выход"
          v-if="isAuthenticated"
        >
          <font-awesome-icon :icon="['fa', 'times']" />
        </b-button>
      </div>
      <Toaster />
    </b-navbar>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { userMapper } from '@/store/modules/user'
import Toaster from '@/components/ui/Toaster.vue'

const Mapper = Vue.extend({
  computed: {
    ...userMapper.mapState(['isAuthenticated', 'userInfo'])
  },
  methods: {
    ...userMapper.mapMutations(['logOut'])
  }
})

@Component({ components: { Toaster } })
export default class Navbar extends Mapper {
  private name = ''
  private exit() {
    this.logOut()
    this.$router.push('/main')
  }
  @Watch('userInfo.name')
  onNameChange() {
    this.name = this.userInfo.name
  }
}
</script>

<style>
.registrationButton {
  margin: 0 0 0 auto;
}
.menu {
  /*position: fixed;*/
  top: 0;
  width: 100%;
  z-index: 1000;
}
.navbarClass {
  cursor: pointer;
}
</style>
