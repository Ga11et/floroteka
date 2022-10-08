import Vue from 'vue'
import CustomButton from '@/components/global/CustomButton.vue'
import BaseSvg from '@/components/global/BaseSvg.vue'

const components = {
  CustomButton,
  BaseSvg
}

Object.entries(components).forEach(([name, component]) => Vue.component(name, component))
