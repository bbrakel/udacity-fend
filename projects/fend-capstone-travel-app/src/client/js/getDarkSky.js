/**
 *  Function that calls the Dark Sky API.
 *
 * @param {*} data - Needed for latitude and longitude
 * @returns - Response: 
 */
const fetchDarkSky = async (data) => {
    const url = 'https://api.darksky.net/forecast/'
    const key = '51cbeb76c9ac593b9c2764abedf8967a'
    let time = new Date(document.getElementById('year').value, document.getElementById('month').value - 1, document.getElementById('day').value)
    try {
        time = time.getTime();
        time = time / 1000
        const dsData = `${url}${key}/${data.lat},${data.lng},${time}`
        let response = await fetch(`http://localhost:8082/${dsData}`)
        try {
            return response.json();
        } catch (error) {
            console.log("CLIENT(js/getDarkSky.js), BAD FETCH", error);
        }
    } catch (error) {
        console.log("CLIENT(js/getDarkSky.js), BAD INPUT", error);
    }
}

export {
    fetchDarkSky
}