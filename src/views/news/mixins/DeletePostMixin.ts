import { postPropsType } from '@/store/models/appTypes'
import { defineComponent, PropType } from 'vue'
export default defineComponent({
  props: {
    content: {
      type: Object as PropType<postPropsType>,
      required: true,
    },
  },
})
