const apiRes = async (input, url = 'http://localhost:8081/api') => {
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        body: await JSON.stringify(input), // body data type must match "Content-Type" header        
    })
    try {
        let newData = await response.json()
        // console.log(newData);
        let confi = newData.confidence * 100
        switch (newData.lang) {
            case "en":
                return document.getElementById('results').innerHTML = `The language of this sentence is English, I'm ${Math.round(confi)} procent sure about it!`
            case "br":
                return document.getElementById('results').innerHTML = `The language of this sentence is Brazilian, I'm ${Math.round(confi)} procent sure about it!`
            case "nl":
                return document.getElementById('results').innerHTML = `The language of this sentence is Dutch, I'm ${Math.round(confi)} procent sure about it!`
            case "de":
                return document.getElementById('results').innerHTML = `The language of this sentence is German, I'm ${Math.round(confi)} procent sure about it!`
            default:
                return document.getElementById('results').innerHTML = `The language of this sentence is ${newData.lang}, I'm ${Math.round(confi)} procent sure about it!`
        }
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

export {
    apiRes
}