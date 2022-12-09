import Vue from 'vue'
import BaseButton from '@/components/global/base/BaseButton.vue'
import BaseSvg from '@/components/global/base/BaseSvg.vue'
import BaseImage from '@/components/global/base/BaseImage.vue'
import BaseAdaptive from '@/components/global/base/BaseAdaptive.vue'
import BaseInputText from '@/components/global/base/BaseInputText.vue'
import BaseCheckbox from '@/components/global/base/BaseCheckbox.vue'
import BaseErrorSpan from '@/components/global/base/BaseErrorSpan.vue'
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
  BaseInputText,
  BaseLoading,
  BasePagination,
  BaseCheckbox,
  BaseErrorSpan,
  FoundNothingPlaceholder,
  SidePath,
  FilterText,
}

Object.entries(components).forEach(([name, component]) => Vue.component(name, component))
