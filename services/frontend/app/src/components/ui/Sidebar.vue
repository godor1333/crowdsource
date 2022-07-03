<template>
  <b-sidebar id="main-sidebar" title="ИС ИОТ" backdrop>
    <b-nav vertical class="py-2 px-1">
      <b-nav-item to="/">Home</b-nav-item>

      <b class="sidebar-header">Составление документов</b>
      <b class="sidebar-header">Разработка</b>
      <b-nav-item to="/about">about</b-nav-item>
      <b-nav-item to="/lorem">
        <font-awesome-icon :icon="['fas', 'biking']" />
        lorem
      </b-nav-item>
    </b-nav>
  </b-sidebar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Sidebar extends Vue {}
</script>

<style lang="scss" scoped>
.sidebar-header {
  padding: 0rem 1rem;
}
</style>
