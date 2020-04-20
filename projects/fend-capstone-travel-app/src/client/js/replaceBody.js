/**
 * @param {*} ele - the new element to create
 * @param {*} data - API response data
 * @param {string} [mess=""] - Text to display on label
 * @param {string} [secMess=""] - Optional second message
 * @returns - an element with the requested data to show on webpage
 */
const createEle = async (ele, data, mess, secMess) => {
    try {
        const x = document.createElement(`${ele}`);
        switch (ele) {
            case 'img':
                if (data == undefined) {
                    return "Picture not available"
                } else {
                    x.src = data.largeImageURL;
                    return x;
                }
                case 'p':
                    x.innerText = data;
                    return x;
                case 'label':
                    x.innerText = `${mess}${data}${secMess}`;
                    return x;
                default:
                    alert("createEle(), FAILED")
                    break;
        }
    } catch (err) {
        alert("FAILED TO CREATE ELEMENT", err);
    }
};

/**
 * Creates a new "main" div and replaces the current one.
 * @param {*} data - API data coming from server-side
 */
const newBody = async (data) => {
    try {
        let newMain = document.createElement("main");
        const newFro = await createEle('label', data.from.placeName, "From: ", `, ${data.from.countryCode}`)
        const newTo = await createEle('label', data.to.placeName, "To: ", `, ${data.to.countryCode}`)
        const date = (new Date(data.time * 1000)).toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        const newDat = await createEle('label', date, "On: ")
        const newImg = await createEle('img', data.pic)
        const newWeather = await createEle('label', data.temp.temperature.toFixed(0), 'Forecast: ', ' degrees Fahrenheit')
        newMain.append(newFro, newTo, newDat, newImg, newWeather)
        try {
            document.getElementById('app').replaceChild(newMain, document.getElementsByTagName('main')[0])
        } catch (err) {
            alert("FAILED TO REPLACE DOM", err);
        }

    } catch (err) {
        alert("CLIENT(js/replaceBody.js", err);
    }
}

export {
    newBody
}