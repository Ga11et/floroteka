import Vue from 'vue'
import BaseButton from '@/components/global/base/BaseButton.vue'
import BaseSvg from '@/components/global/base/BaseSvg.vue'
import BaseImage from '@/components/global/base/BaseImage.vue'
import BaseAdaptive from '@/components/global/base/BaseAdaptive.vue'
import BaseInputText from './inputs/BaseInputText.vue'
import BaseTextarea from './inputs/BaseTextarea.vue'
import BaseDropfileContainer from './inputs/BaseDropfileContainer.vue'
import BaseCheckboxInput from './inputs/BaseCheckboxInput.vue'
import BaseSelect from './inputs/BaseSelect.vue'
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
  BaseAdaptive,
  BaseLoading,
  BasePagination,
  BaseCheckbox,
  BaseErrorSpan,
  FoundNothingPlaceholder,
  SidePath,
  FilterText,
}

Object.entries(components).forEach(([name, component]) => Vue.component(name, component))

// need to fix this later
Vue.component('base-input-text', BaseInputText)
Vue.component('base-image', BaseImage)
Vue.component('base-textarea', BaseTextarea)
Vue.component('base-dropfile-container', BaseDropfileContainer)
Vue.component('base-checkbox-input', BaseCheckboxInput)
Vue.component('base-select', BaseSelect)
