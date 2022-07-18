import { plantPropsType, beforeAfterPostPropsType, plantAirtableContentType, beboreAfterAirtableContentType } from '../models'

export const fetchPlantsData = async () => {
  const response = await fetch('https://api.airtable.com/v0/apphq3bB8tbOJbcaa/images', { headers: { Authorization: process.env.VUE_APP_API_KEY } })
  const data = await response.json()
  const readyData = data.records as plantAirtableContentType[]
  return readyData.map(el => {
    const formattedData: plantPropsType = {
      id: el.fields.id,
      description: el.fields.description,
      name: el.fields.Name,
      img: el.fields.image[0].url
    }
    return formattedData
  })
}

export const fetchBeforeAfterPostsData = async () => {
  const response = await fetch('https://api.airtable.com/v0/apphq3bB8tbOJbcaa/beforeAfter', { headers: { Authorization: process.env.VUE_APP_API_KEY } })
  const data = await response.json()
  const readyData = data.records as beboreAfterAirtableContentType[]
  return readyData.map(el => {
    const formattedData: beforeAfterPostPropsType = {
      id: el.fields.id,
      after: el.fields.after[0].url,
      before: el.fields.before[0].url,
      date: el.fields.date,
      heading: el.fields.heading,
      text: el.fields.text
    }
    return formattedData
  })
}
