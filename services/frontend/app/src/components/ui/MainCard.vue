<template>
  <div
    :class="{ 'd-flex': !noflex, 'flex-column': !noflex, 'flex-fill': !noflex }"
  >
    <b-card
      border-variant="primary"
      header-bg-variant="primary"
      header-text-variant="white"
      header-class="MainCard__header"
      :no-body="noBody"
    >
      <template v-slot:header>
        <div class="d-flex flex-row align-items-center">
          <b>{{ name }}</b>
          <div class="ml-auto d-flex flex-row" style="height: 32px">
            <slot name="controls" />
          </div>
        </div>
      </template>
      <slot></slot>
    </b-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class MainCard extends Vue {
  @Prop({ type: String, required: true }) private readonly name!: string
  @Prop({ type: Boolean, default: false }) private readonly noflex!: boolean
  @Prop({ type: Boolean, default: false }) private readonly 'no-body'!: boolean
}
</script>

<style lang="scss" scoped>
.MainCard__header {
  padding-top: 0.25rem !important;
  padding-bottom: 0.25rem !important;
}
</style>
