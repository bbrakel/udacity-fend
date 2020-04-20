const fetchPixabay = async (data) => {
    const key = '14765316-1d53370bd2be77309bfeb7e2b'
    let url = `https://pixabay.com/api/?key=${key}&q=${data}`
    try {
        let response = await fetch(url)
        try {
            return await response.json()
        } catch (error) {
            console.log("CLIENT(js/getPixabay.js), BAD RESPONSE", error);
        }
    } catch (error) {
        console.log("CLIENT(js/getPixabay.js), BAD INPUT", error);
    }
}

export {
    fetchPixabay
}