<template>
  <div class="d-flex flex-column justify-content-between h-100 shadow">
    <!--:src="`http://localhost:3000${product.photo}`"-->
    <div class="d-flex m-1">
      <div class="mr-2">
        <img
          @load="onPreviewLoad"
          class="w-100"
          :src="
            require(`@/assets/icons/${
              product.data_type === 'text' ? 'text.jpeg' : 'photo.jpg'
            }`)
          "
          :style="{ height: previewHeight + 'px' }"
          style=""
          alt="Preview"
        />
      </div>
      <div class="mr-2">
        <h3 class="mt-1 text-o-ellipsis">
          <b>{{ product.title }}</b>
        </h3>
        <h4 class="mt-1 text-o-ellipsis">Описание</h4>
        <div>
          {{ product.description }}
        </div>
        <h4 class="mt-1 text-o-ellipsis">Заказчик</h4>
        <div class="mt-1 text-o-ellipsis">{{ product.customer }}</div>
        <div class="d-flex">
          <h4 class="mt-1 text-o-ellipsis">Дата добавления</h4>
          <div class="mt-2 ml-2 text-o-ellipsis">
            {{ product.dateCreate }}
          </div>
        </div>
        <div class="mt-2 d-flex">
          <b-button
            v-if="isWork"
            class="mr-1"
            @click="onProceedClick()"
            variant="info"
          >
            Приступить
          </b-button>
          <b-button
            v-if="!isWork"
            class="mr-1"
            @click="onEditClick()"
            variant="info"
          >
            Редактировать
          </b-button>
          <b-button
            v-if="!isWork"
            class="mr-1"
            @click="onProceedClick()"
            variant="info"
          >
            Статистика по каждома элементу
          </b-button>
          <b-button
            v-if="!isWork"
            class="mr-1"
            @click="onStatisticClick()"
            variant="info"
          >
            Общая статистика
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { userMapper } from '@/store/modules/user'
import { customerMapper } from '@/store/modules/customer'
import { clientMapper } from '@/store/modules/client'

const Mappers = Vue.extend({
  computed: {
    ...userMapper.mapState(['isWork']),
    ...clientMapper.mapState(['selectOrder'])
  },
  methods: {
    ...customerMapper.mapMutations(['setEditOrder']),
    ...clientMapper.mapMutations(['setSelectOrder']),
    ...clientMapper.mapActions(['fetchFullInfoOrder'])
  }
})

@Component({
  components: {}
})
export default class NewsPreview extends Mappers {
  @Prop(Object) product: any

  $refs!: {
    previewImage: HTMLImageElement
  }

  private previewHeight = 0

  onPreviewLoad(event: any) {
    this.previewHeight = event.target.clientWidth * 0.5625 // 0.5625 = 9/16 => Соотношение сторон: 16:9
  }

  private async onProceedClick() {
    this.setSelectOrder(this.product)
    await this.fetchFullInfoOrder(this.product._id.$oid)
    this.$router.push('/main/work/task')
  }

  private onEditClick() {
    this.setEditOrder(this.product)
    this.$bvModal.show('editOrderModal')
  }

  private onStatisticClick() {
    this.setEditOrder(this.product)
    this.$router.push('/main/work/statistic')
  }
}
</script>

<style scoped lang="scss">
@import '@/scss/_colors.scss';
.text-o-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
}
.fieldSizeInput {
  margin-right: 2px;
}
</style>
