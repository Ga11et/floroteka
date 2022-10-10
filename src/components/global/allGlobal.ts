import Vue from 'vue'
import BaseButton from '@/components/global/base/BaseButton.vue'
import BaseSvg from '@/components/global/base/BaseSvg.vue'
import BaseImage from '@/components/global/base/BaseImage.vue'
import BaseAdaptive from '@/components/global/base/BaseAdaptive.vue'
import FoundNothingPlaceholder from '@/components/global/FoundNothingPlaceholder.vue'
import BasePagination from '@/components/global/base/BasePagination.vue'
import FilterText from '@/components/global/FilterText.vue'
import SidePath from '@/components/global/SidePath.vue'
import BaseLoading from '@/components/global/base/BaseLoading.vue'

const components = {
  BaseButton,
  BaseSvg,
  BaseImage,
  BaseAdaptive,
  FoundNothingPlaceholder,
  SidePath,
  BaseLoading,
  FilterText,
  BasePagination
}

Object.entries(components).forEach(([name, component]) => Vue.component(name, component))
