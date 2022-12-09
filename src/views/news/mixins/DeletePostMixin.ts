import store from '@/store'
import { postPropsType } from '@/store/models/appTypes'
import { defineComponent, PropType } from 'vue'
export default defineComponent({
  props: {
    content: {
      type: Object as PropType<postPropsType>,
      required: true,
    },
  },
  data() {
    return {
      isModalOpen: false,
      modalError: '',
    }
  },
  computed: {
    isAuth() {
      return store.getters.isAuth
    },
  },
  methods: {
    deletePostHandler() {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' })
      setTimeout(() => {
        this.$data.isModalOpen = true
        this.$root?.$emit('disableScroll')
      }, 500)
    },
    async submitModalhandler(pass: string) {
      const response = await store.dispatch('deletePost', { id: this.$props.content.id, pass })
      if (response === 'ok') {
        this.$data.isModalOpen = false
        this.$root?.$emit('ableScroll')
        setTimeout(() => {
          this.$root?.$emit('scroll')
        }, 300)
        return
      }
      this.$data.modalError = response[0].msg
    },
  },
})
