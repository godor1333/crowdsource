<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { userMapper } from '@/store/modules/user'
import { customerMapper } from '@/store/modules/customer'
import StatisticAPI from '@/api/statistic'
import { Bar, mixins } from 'vue-chartjs'

const Mappers = Vue.extend({
  extends: Bar,
  mixins: [mixins.reactiveProp],
  computed: {
    ...userMapper.mapState(['isAuthenticated', 'isWork', 'userId']),
    ...customerMapper.mapState(['orderList', 'editOrder'])
  }
})

@Component({})
export default class StatisticAnswers extends Mappers {
  public renderChart!: (chartData: any, options?: any) => void
  async mounted() {
    // Overwriting base render method with actual data.
    const data = (await StatisticAPI.geAnswerStatistic(this.editOrder._id.$oid))
      .data
    const keyAnswer: any[] = []
    const valAnswer: any[] = []
    for (const keySup in data) {
      keyAnswer.push(keySup)
      valAnswer.push(data[keySup])
    }
    this.renderChart({
      labels: keyAnswer,
      datasets: [
        {
          label: 'Ответы',
          backgroundColor: '#f87979',
          data: valAnswer
        }
      ]
    })
  }
}
</script>

<style lang="scss" scoped>
.swiper-size {
  height: 30%;
  display: flex;
}
.textMainView {
  font-size: 18px;
}
.catalogList {
  height: 60vh;
  overflow: scroll;
  overflow-x: hidden;
}
.addOrderClass {
  text-align: right;
}
</style>
