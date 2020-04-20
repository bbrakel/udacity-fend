import {
    handlePOST
}
from "./postData";
import {
    fetchGeonames
}
from "./getGeonames";
import {
    fetchDarkSky
}
from "./getDarkSky";
import {
    fetchPixabay
}
from "./getPixabay";
const listen = (ele = document.getElementById('generate')) => {
    try {
    ele.addEventListener('click', () => {
        try {
            handleSubmit();
        } catch (err) {
            console.log("CLIENT(js/submitForm.js), EVENT ERROR", err);
        }
    })} catch (err) {
        console.log("CLIENT(js/submitForm.js), EVENT ERROR", err);
    }
};

window.onload = listen();

const handleSubmit = async () => {
    let input = document.getElementById('input')
        .value
    let from = document.getElementById('from')
        .value
    try {
        let postRes = (await handlePOST('http://localhost:8080/apidata', await fetchGeonames(input)))
            .data;
        let postResFrom = (await handlePOST('http://localhost:8080/apidata', await fetchGeonames(from)))
            .data;
        console.log(postRes)
        try {
            const createEle = async (ele, data, mess = "", secMess = "") => {
                const x = document.createElement(`${ele}`);
                switch (ele) {
                    case 'img':
                        const pix = await fetchPixabay(data);
                        x.src = (pix.hits[0]).largeImageURL;
                        return x;
                    case 'p':
                        x.innerText = data;
                        return x;
                    case 'label':
                        x.innerText = `${mess}${data}${secMess}`;
                        return x;

                    default:
                        console.log("createEle(), FAILED")
                        break;
                }
            };
            let newMain = document.createElement("main");
            const newSta = await createEle('label', postResFrom.placeName, "From: ", `, ${postResFrom.countryCode}`)
            const newCit = await createEle('label', postRes.placeName, "To: ", `, ${postRes.countryCode}`)
            const date = (new Date(document.getElementById('year').value, document.getElementById('month').value - 1, document.getElementById('day').value)).toLocaleDateString()
            const newDat = await createEle('label', date, "On: ")
            // const newLat = await createEle('p', postRes.lat)
            // const newLng = await createEle('p', postRes.lng)
            // const froLat = await createEle('p', postResFrom.lat)
            // const froLng = await createEle('p', postResFrom.lng)
            const newImg = await createEle('img', postRes.placeName)
            newMain.append(newSta, newCit, newDat, /*newLat, newLng, froLat, froLng,*/ newImg)
            console.log(newMain);
            document.getElementById('app').replaceChild(newMain, document.getElementsByTagName('main')[0])

        } catch (error) {
            console.log("CLIENT(js/submitForm.js), BAD RESPONSE", error);
        }
    } catch (error) {
        alert("INVALID INPUT")
        console.log("CLIENT(js/submitForm.js), BAD INPUT", error);
    }
} 

export {
    handleSubmit,
    listen
}