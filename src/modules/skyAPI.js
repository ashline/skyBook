const URL = "example.com"

const createPayload = blob => {
    const formData = new FormData()
    formData.append("file", blob)
}

const upload = async payload => {
    return fetch(URL, {
        method: "POST",
        body: payload
    }).then(response => response.json())
}

export default {
    createPayload,
    upload
}
