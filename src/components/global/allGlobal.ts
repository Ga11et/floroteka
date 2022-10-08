import Vue from 'vue'
import CustomButton from '@/components/global/CustomButton.vue'

const components = {
  CustomButton
}

Object.entries(components).forEach(([name, component]) => Vue.component(name, component))
