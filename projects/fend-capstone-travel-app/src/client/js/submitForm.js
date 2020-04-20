import {
    handlePOST
} from "./postData";

import {
    newBody
} from "./replaceBody"

/**
 * Listens for button presses to submit data.
 * @param {string} [ele=document.getElementById('generate')] - is the "Submit" button
 */
const listen = (ele = document.getElementById('generate')) => {
    try {
        ele.addEventListener('click', async () => {
            try {
                newBody(await handleData())
            } catch (err) {
                alert("CLIENT(js/submitForm.js), EVENT ERROR", err);
            }
        })
    } catch (err) {
        alert("CLIENT(js/submitForm.js), EVENT ERROR", err);
    }
};

window.onload = listen();

/**
 * Async function to process data when submitted.
 * Then send this data as an object to the newBody() function @ replaceBody.js
 */
const handleData = async () => {
    try {
        const data = {
            from: (await handlePOST('http://localhost:8080/geoAPI', {
                "input": document.getElementById('from').value || "Amsterdam"
            })).postalCodes[0],
            to: (await handlePOST('http://localhost:8080/geoAPI', {
                "input": document.getElementById('to').value || "Haarlem"
            })).postalCodes[0],
        }
        data.pic = (await handlePOST('http://localhost:8080/pixAPI', {
            "input": data.to.placeName
        })).hits[0]
        if (data.pic == undefined) {
            data.pic = (await handlePOST('http://localhost:8080/pixAPI', {
                "input": data.to.adminName1 || "Haarlem"
            })).hits[0]
        }
        data.time = (Number(new Date(`${document.getElementById('year').value || '2020' }-${document.getElementById('month').value || '03' }-${document.getElementById('day').value || '01' }`))) / 1000
        data.temp = (await handlePOST('http://localhost:8080/dsAPI', {
            "lat": data.to.lat,
            "long": data.to.lng,
            "time": data.time
        })).currently
        return data;
    } catch (err) {
        alert("CLIENT(js/submitForm.js), Something went wrong", err);
    }
}



export {
    listen,
    handleData
}