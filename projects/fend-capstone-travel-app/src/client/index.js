import {
    handlePOST
} from "./js/postData";

import {
    handleSubmit,
    listen
} from "./js/submitForm"

import {
    fetchGeonames
} from "./js/getGeonames"

import {
    fetchDarkSky
} from "./js/getDarkSky"

import {
    fetchPixabay
} from "./js/getPixabay"

import './styles/aside.scss'
import './styles/body.scss'
import './styles/footer.scss'
import './styles/header.scss'
import './styles/main.scss'

export {
    handlePOST,
    handleSubmit,
    fetchGeonames,
    fetchDarkSky,
    fetchPixabay,
    listen
}