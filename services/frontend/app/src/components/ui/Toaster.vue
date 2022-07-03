<template>
  <div>
    <div class="b-toaster-slot">
      <b-toast
        id="example-toast"
        @hidden="onHideToast(toast.id, $event)"
        @shown="onShown(toast.id, toast.time)"
        :class="getStyle(toast)"
        :title="toast.title"
        static
        no-auto-hide
        v-for="(toast, index) in toasts"
        :key="index"
      >
        <span v-html="toast.message"></span>
      </b-toast>
    </div>
  </div>
</template>

<script>
// TODO rewrite as class
import { mapActions } from 'vuex'
export default {
  name: 'Toaster',
  data() {
    return {
      toastCount: 0
    }
  },
  computed: {
    toasts() {
      this.updateToasts()
      return this.$store.getters['toast/toasts']
    }
  },
  methods: {
    ...mapActions({
      delToast: 'toast/delToast',
      pushToast: 'toast/pushToast'
    }),
    onHideToast(id, e) {
      e.preventDefault()
      setTimeout(() => {
        this.delToast(id)
      }, 0)
    },
    updateToasts() {
      setTimeout(() => {
        this.$bvToast.show('example-toast')
      }, 0)
    },
    onShown(id, time) {
      setTimeout(
        () => {
          this.delToast(id)
        },
        time ? time * 1000 : 10000
      )
    },
    getStyle(toast) {
      if (toast.error) {
        return 'b-toast-error'
      } else if (toast.variant) {
        return `b-toast-${toast.variant}`
      } else {
        return 'b-toast-default'
      }
    }
  }
}
</script>

<style>
#example-toast {
  opacity: 1 !important;
  margin-top: 30px;
  width: 300px;
  word-wrap: break-word;
}
.b-toaster-slot {
  position: fixed;
  right: 5px;
  top: 38px;
  z-index: 2000;
}
.b-toast-error .toast-header {
  background-color: #eb2f06;
  color: white;
}
.b-toast-default .toast-header {
  background-color: #82ccdd;
  color: white;
}
</style>
