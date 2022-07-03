<template>
  <div class="ml-5">
    <div class="stats-chart stats-answer">
      <h2>Всего ответов на вопросы</h2>
      <StatisticAnswers />
    </div>
    <div class="stats-chart stats-user">
      <h2>Соотношение завершивших разметку и не начавших разметку</h2>
      <StatisticUsers />
    </div>
    <div class="stats-chart"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import StatisticAnswers from '@/components/statistics/StatisticAnswers.vue'
import StatisticUsers from '@/components/statistics/StatisticUsers.vue'

const Mappers = Vue.extend({
  computed: {}
})

@Component({
  components: {
    StatisticAnswers,
    StatisticUsers
  }
})
export default class Statistic extends Mappers {}
</script>

<style lang="scss" scoped>
.stats-chart {
  width: 50%;
  height: 25vh;
  margin-left: 20%;
}
.stats-answer {
  margin-top: 5%;
}
.stats-user {
  margin-top: 15%;
  margin-bottom: 5%;
}
</style>
