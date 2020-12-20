const upload = (file, onSuccess, onFailure) => {
    const data = new FormData()
    data.append('file', file)

    window
        .fetch('https://file.io/', {
        method: 'POST',
        mode: 'cors',
        body: data,
    })
        .then(res => {
            if(res.ok) {
                return res.json()
            } else {
                throw new Error(res.status)
            }
        })
        .then(data => onSuccess(data))
        .catch(error => {onFailure()})
}
export {upload}