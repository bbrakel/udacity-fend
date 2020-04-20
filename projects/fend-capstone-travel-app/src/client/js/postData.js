/**
 * Fetch request to handle POST requests
 *
 * @param {string} [url=''] - URL to make the request to
 * @param {*} [data={}] - Data object to post
 * @returns - An JSON object with data based on input
 */
const handlePOST = async (url = '', data = {}) => {
    const postRes = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    try {
        return await postRes.json();
    } catch (error) {
        console.log("CLIENT(js/postData.js), POST REQUEST FAILED", error);
    }
}

export {
    handlePOST
}