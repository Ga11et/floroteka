import { plantPropsType, beforeAfterPostPropsType, plantAirtableContentType, beboreAfterAirtableContentType, postAirtableContentType, PostPropsType } from '../models'

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

export const fetchAllPostsData = async () => {
  const response = await fetch('https://api.airtable.com/v0/apphq3bB8tbOJbcaa/posts', { headers: { Authorization: process.env.VUE_APP_API_KEY } })
  const data = await response.json()
  const readyData = data.records as postAirtableContentType[]
  return readyData.map(el => {
    const formattedData: PostPropsType = {
      id: el.fields.id,
      after: el.fields.after ? el.fields.after[0].url : '',
      before: el.fields.before ? el.fields.before[0].url : '',
      date: el.fields.date,
      heading: el.fields.heading,
      text: el.fields.text,
      images: el.fields.images ? el.fields.images.map(el => el.url) : [],
      type: el.fields.type
    }
    return formattedData
  })
}

export const postPlantData = async (name: string, description: string, imgUrl: string) => {
  const urlResp = await fetch('http://localhost:3000/plants', { method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ data: imgUrl }) })
    .then(resp => resp.json())
  const data = {
    records: [
      { fields: { id: '10', description: description, image: [{ url: urlResp }], Name: name } }
    ]
  }
  const response = await fetch('https://api.airtable.com/v0/apphq3bB8tbOJbcaa/images', { headers: { Authorization: process.env.VUE_APP_API_KEY, 'Content-Type': 'application/json' }, method: 'POST', body: JSON.stringify(data) })
  return response
}
