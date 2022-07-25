import { plantPropsType, plantAirtableContentType, postAirtableContentType, PostPropsType } from '../models'

export const fetchPlantsData = async () => {
  const response = await fetch('https://api.airtable.com/v0/apphq3bB8tbOJbcaa/plants', { headers: { Authorization: process.env.VUE_APP_API_KEY } })
  const data = await response.json()
  const readyData = data.records as plantAirtableContentType[]
  return readyData.map(el => {
    const formattedData: plantPropsType = {
      id: el.fields.id,
      description: el.fields.description,
      name: el.fields.Name,
      img: el.fields.image.map(el => el.url),
      date: el.fields.date,
      family: el.fields.family,
      from: el.fields.from,
      having: el.fields.having,
      latin: el.fields.latin,
      livingPlace: el.fields.livingPlace,
      type: el.fields.type
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

export const postPlantData = async (plantFormData: plantPropsType) => {
  let urlResp = ''
  if (plantFormData.img[0] !== '') {
    urlResp = await fetch('https://florotekaback.herokuapp.com/plants', { method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ data: plantFormData.img[0] }) })
      .then(resp => resp.json())
  }
  const data = {
    records: [
      {
        fields: {
          id: '10',
          description: plantFormData.description,
          image: [{ url: urlResp }],
          Name: plantFormData.name,
          date: plantFormData.date,
          family: plantFormData.family,
          from: plantFormData.from,
          having: plantFormData.having,
          latin: plantFormData.latin,
          type: plantFormData.type,
          livingPlace: plantFormData.livingPlace
        }
      }
    ] as plantAirtableContentType[]
  }
  console.log(data)
  const response = await fetch('https://api.airtable.com/v0/apphq3bB8tbOJbcaa/plants', { headers: { Authorization: process.env.VUE_APP_API_KEY, 'Content-Type': 'application/json' }, method: 'POST', body: JSON.stringify(data) })
  return response
}
