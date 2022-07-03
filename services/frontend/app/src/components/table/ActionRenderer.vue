<template>
  <div v-if="!noActions" class="ActionRenderer__Buttons">
    <b-button-group>
      <b-button
        @click="onPrint"
        v-if="this.params.onPrint && checkType('onPrint')"
      >
        <font-awesome-icon :icon="['fas', 'print']" />
      </b-button>
      <b-button
        @click="onConfirm"
        v-if="this.params.onConfirm && checkType('onConfirm')"
      >
        <font-awesome-icon :icon="['fas', 'check']" />
      </b-button>
      <b-button
        @click="onClone"
        v-if="this.params.onClone && checkType('onClone')"
      >
        <font-awesome-icon :icon="['fas', 'copy']" />
      </b-button>
      <b-button
        @click="onLoad"
        v-if="this.params.onLoad && checkType('onLoad')"
      >
        <font-awesome-icon :icon="['fas', 'file']" />
      </b-button>
      <b-button
        @click="onEdit"
        v-if="this.params.onEdit && checkType('onEdit')"
      >
        <font-awesome-icon :icon="['fas', 'edit']" />
      </b-button>
      <b-button
        @click="onDelete"
        v-if="this.params.onDelete && checkType('onDelete')"
      >
        <font-awesome-icon :icon="['fas', 'times']" />
      </b-button>
      <b-button
        @click="onRedirect"
        v-if="this.params.onRedirect && checkType('onRedirect')"
        title="Перейти к заказу"
      >
        <font-awesome-icon :icon="['fas', 'arrow-up']" />
      </b-button>
      <b-button
        @click="onInfo"
        v-if="this.params.onInfo && checkType('onInfo')"
      >
        <font-awesome-icon :icon="['fas', 'arrow-up']" />
      </b-button>
      <b-button
        @click="onLink"
        v-if="this.params.onLink && checkType('onLink')"
      >
        <font-awesome-icon :icon="['fas', 'external-link-alt']" />
      </b-button>
    </b-button-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ICellRendererParams } from 'ag-grid-community'

interface Params extends ICellRendererParams {
  [key: string]: any
}

@Component
export default class AgGridField extends Vue {
  params!: Params
  noActions = false
  noConfirm = false

  created() {
    if (this.params.data) {
      if (this.params.data._noActions) {
        this.noActions = true
      }
      if (this.params.data._noConfirm) {
        this.noConfirm = true
      }
    }
  }

  checkType(type: string) {
    return this.params.getActionByType
      ? this.params.getActionByType(this.params).includes(type)
      : true
  }
  onDelete() {
    this.params.onDelete(this.params)
  }
  onRedirect() {
    this.params.onRedirect(this.params)
  }
  onEdit() {
    this.params.onEdit(this.params)
  }
  onClone() {
    this.params.onClone(this.params)
  }
  onInfo() {
    this.params.onInfo(this.params)
  }

  onLink() {
    this.params.onLink(this.params)
  }

  onLoad() {
    this.params.onLoad(this.params)
  }

  onPrint() {
    this.params.onPrint(this.params)
  }

  onConfirm() {
    this.params.onConfirm(this.params)
  }
}
</script>

<style lang="scss" scoped>
.ActionRenderer__Buttons {
  display: flex;
  height: 40px;
  vertical-align: top;
  padding: 3px 0;
}
</style>
