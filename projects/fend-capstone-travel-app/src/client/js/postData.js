/**
 * Fetch request to handle POST requests to server
 *
 * @param {string} [url=''] - URL to make the request to
 * @param {*} [data={}] - Data object to post
 * @returns - An JSON object with data based on input
 */
const handlePOST = async (url = '', data = {}) => {
  try {
    const response = await fetch(url, {
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
    })
    return await response.json();
  } catch (err) {
    return "handlePOST FAILED"
  }
}

export {
  handlePOST
}