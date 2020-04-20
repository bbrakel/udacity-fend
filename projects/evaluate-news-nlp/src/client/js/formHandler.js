import {
    apiRes
} from "./getAPIdata"

/**
 * Function to handle the input given by user and chain returns this to apiRes()
 * @param {*} event - Catch mouse event to cancel page refresh
 */
const handleSubmit = async (event) => {
    if (event.cancelable) {
        event.preventDefault()
    }
    /**
     * Checks if the input is valid, returns input to checkForName()
     * @param {string} [input=document.getElementById('name').value] - Check what text was put into the form field
     * @returns - If there is input by the user, return it
     */
    let formText = async (input = document.getElementById('name').value) => {
        try {
            Client.checkForName(input)
            return input
        } catch (error) {
            alert('Not a valid input', error)
        }
    }
    try {
        let formData = {
            text: await formText()
        }
        apiRes(await formData)
        console.log("::: Form Submitted :::")
    } catch (error) {
        console.error(error)
    }
}
// console.log(newData)

export {
    handleSubmit
}