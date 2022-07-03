<template>
  <div>
    <Sidebar />
    <Navbar />
    <div>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Navbar from '@/components/ui/Navbar.vue'
import Sidebar from '@/components/ui/Sidebar.vue'

@Component({
  components: { Navbar, Sidebar }
})
export default class Home extends Vue {
  mounted() {
    this.$router.push('/main')
  }
}
</script>
