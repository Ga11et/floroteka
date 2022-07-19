export type plantPropsType = {
    name: string
    description: string
    img: string
    id: string
}
export type beforeAfterPostPropsType = {
    id: string
    heading: string
    date: string
    text: string
    before: string
    after: string
}
export type plantAirtableContentType = {
    fields: {
        Name: string
        image: [
            { url: string }
        ]
        id: string
        description: string
    }
}
export type beboreAfterAirtableContentType = {
    fields: {
        Name: string
        after: [
            { url: string }
        ]
        before: [
            { url: string }
        ]
        id: string
        date: string
        heading: string
        text: string
    }
}