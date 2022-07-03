<template>
  <div>
    <div class="d-flex ml-5" style="flex-wrap: wrap;">
      <div v-if="pair.first" class="m-1 cardView">
        <div class="mr-2">
          <div v-if="pair.first.type === 'text'">
            {{ pair.first.mainObj }}
          </div>
          <div v-if="pair.first.type === 'photo'">
            <img
              @load="onPreviewLoad"
              class="w-100"
              :src="pair.first.image"
              :style="{ height: previewHeight + 'px' }"
              style=""
              alt="Preview"
            />
          </div>
        </div>
        <div class="mr-2">
          <div v-if="isWork" class="d-flex">
            <b-form-radio
              class="mr-3"
              v-for="(obj, index) of pair.first.answers"
              :key="index"
              v-model="pair.first.selected"
              :state="!!pair.first.selected.length"
              :value="`${obj}`"
              @change="changeValFirst"
              >{{ obj }}</b-form-radio
            >
          </div>
          <div v-if="!isWork" class="d-flex">
            <div
              class="mr-3"
              v-for="(obj, index) of pair.first.answers"
              :key="index"
            >
              {{ obj }}
            </div>
          </div>
        </div>
      </div>
      <div style="width: 17%;"></div>
      <div v-if="pair.second" class="m-1 cardView">
        <div class="mr-2">
          <div v-if="pair.second.type === 'text'">
            {{ pair.second.mainObj }}
          </div>
          <div v-if="pair.second.type === 'photo'">
            <img
              @load="onPreviewLoad"
              class="w-100"
              :src="pair.second.image"
              :style="{ height: previewHeight + 'px' }"
              style=""
              alt="Preview"
            />
          </div>
        </div>
        <div class="mr-2">
          <div v-if="isWork" class="d-flex">
            <b-form-radio
              class="mr-3"
              v-for="(obj, index) of pair.second.answers"
              :key="index"
              :state="!!pair.second.selected.length"
              v-model="pair.second.selected"
              :value="`${obj}`"
              @change="changeValSecond"
              >{{ obj }}</b-form-radio
            >
          </div>
          <div v-if="!isWork" class="d-flex">
            <div
              class="mr-3"
              v-for="(obj, index) of pair.first.answers"
              :key="index"
            >
              {{ obj }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { clientMapper } from '@/store/modules/client'
import { userMapper } from '@/store/modules/user'

const Mappers = Vue.extend({
  computed: {
    ...clientMapper.mapState(['viewOrderPage']),
    ...userMapper.mapState(['isWork'])
  },
  methods: {
    ...clientMapper.mapMutations(['checkFill'])
  }
})

@Component({
  components: {}
})
export default class ViewOrderCard extends Mappers {
  @Prop(Object) pair: any
  @Prop(Number) index: any

  private changeValFirst(event: any) {
    this.pair.first.selected = event
    this.checkFill()
  }
  private changeValSecond(event: any) {
    this.pair.second.selected = event
    this.checkFill()
  }
  $refs!: {
    previewImage: HTMLImageElement
  }

  private previewHeight = 0

  onPreviewLoad(event: any) {
    this.previewHeight = event.target.clientWidth * 0.5625 // 0.5625 = 9/16 => Соотношение сторон: 16:9
  }
}
</script>

<style scoped lang="scss">
.cardView {
  width: 60ch;
}
.rightSide {
  margin-left: 500px;
}
</style>
