<template>
  <div>
    <div v-for="(pair, index) of viewOrderPage.pairs" :key="index">
      <ViewOrderCard :pair="pair" :index="index" />
    </div>
    <div class="menuDiv">
      <div class="buttonAdd">
        <b-button
          variant="info"
          @click="endProcessed"
          :hidden="!isWork"
          :disabled="!allFilled"
          >Отправить данные</b-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { clientMapper } from '@/store/modules/client'
import ViewOrderCard from '@/components/help/ViewOrderCard.vue'
import ClientAPI from '@/api/client'
import { userMapper } from '@/store/modules/user'
import { arrayBufferToBlob } from 'blob-util'

const Mappers = Vue.extend({
  computed: {
    ...clientMapper.mapState([
      'viewOrderPage',
      'selectOrder',
      'fullInfoOrder',
      'allFilled'
    ]),
    ...userMapper.mapState(['isWork'])
  },
  methods: {}
})

@Component({
  components: {
    ViewOrderCard
  }
})
export default class ViewOrderPage extends Mappers {
  private async endProcessed() {
    for (const item in this.fullInfoOrder.data) {
      for (const key in this.fullInfoOrder.data[item]) {
        this.fullInfoOrder.data[item][key] = 0
      }
    }
    for (const item of this.viewOrderPage.pairs) {
      if (item.first) {
        this.fullInfoOrder.data[`${item.first.mainObj}`][
          `${item.first.selected}`
        ]++
      }
      if (item.second) {
        this.fullInfoOrder.data[`${item.second.mainObj}`][
          `${item.second.selected}`
        ]++
      }
    }
    const sendObj: any = { data: this.fullInfoOrder.data }
    sendObj['data_type'] = this.fullInfoOrder.data_type
    await ClientAPI.editWorkerOrder(sendObj, this.selectOrder._id.$oid)
    this.$router.push('/main/work')
  }

  async created() {
    const inputArr: any[] = []
    for (const key in this.fullInfoOrder.data) {
      const keyAnswer: any[] = []
      let sumValKay = 0
      for (const keySup in this.fullInfoOrder.data[`${key}`]) {
        this.isWork
          ? keyAnswer.push(keySup)
          : (sumValKay += this.fullInfoOrder.data[`${key}`][`${keySup}`])
      }
      if (!this.isWork) {
        for (const keySup in this.fullInfoOrder.data[`${key}`]) {
          keyAnswer.push(
            sumValKay
              ? `${keySup} - ${(this.fullInfoOrder.data[`${key}`][`${keySup}`] /
                  sumValKay) *
                  100}%`
              : '0%'
          )
        }
      }
      let urlPhoto: any = null
      if (this.selectOrder.data_type === 'photo') {
        const urlImg = key.replace('$', '.')
        urlPhoto = (
          await ClientAPI.addUploadPhoto(this.selectOrder._id.$oid, urlImg)
        ).data
      }
      const tmpObj: any = {
        mainObj: key,
        image: URL.createObjectURL(arrayBufferToBlob(urlPhoto)),
        imgId: this.selectOrder._id.$oid,
        selected: '',
        answers: keyAnswer,
        type: this.selectOrder.data_type
      }
      inputArr.push(tmpObj)
    }
    const pairsArray: any[] = []
    for (let i = 0; i < inputArr.length; i += 2) {
      let first = null
      let second = null
      if (inputArr[i]) {
        first = inputArr[i]
      }
      if (inputArr[i + 1]) {
        second = inputArr[i + 1]
      }
      pairsArray.push({
        first: first ? { ...first } : null,
        second: second ? { ...second } : null
      })
    }
    this.viewOrderPage.pairs = pairsArray
  }
}
</script>

<style lang="scss" scoped>
.menuDiv {
  display: flex;
  padding: 5px;
}
.buttonAdd {
  margin: 0 0 0 auto;
}
</style>
