import { FormType } from '../types/types'
import PlantAddingForm from '../components/forms/PlantAddingForm.vue'
import BeforeAfrerPostForm from '../components/forms/beforeAfterAddingForm.vue'
import TechnologiesPostForm from '../components/forms/technologyAddingForm.vue'
import ThingsAddingForm from '../components/forms/ThingsAddingForm.vue'
import noFormContainerVue from '../components/forms/noFormContainer.vue'
import studyProjectAddingFormVue from '../components/forms/projectAddingForm.vue'
import scienceActivityAddingForm from '../components/forms/scienceActivityAddingForm.vue'

export const changeFormSwitch = (formType: FormType) => {
  switch (formType) {
    case 'plantForm':
      return PlantAddingForm
    case 'beforeAfterPostForm':
      return BeforeAfrerPostForm
    case 'technologiesForm':
      return TechnologiesPostForm
    case 'thingsForm':
      return ThingsAddingForm
    case 'studyProject':
      return studyProjectAddingFormVue
    case 'scienceForm':
      return scienceActivityAddingForm
    default:
      return noFormContainerVue
  }
}
