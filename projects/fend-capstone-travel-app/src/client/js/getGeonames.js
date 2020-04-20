const fetchGeonames = async (zip, url = 'http://api.geonames.org/postalCodeSearchJSON?', key = 'basbrakel') => {
    const res = await fetch(`${url}postalcode=${zip}&username=${key}`);
    try {
        return await res.json();
    } catch (error) {
        console.log("CLIENT(js/postData.js), ERROR", error);
    }
}

export {
    fetchGeonames
}