import axios from 'axios'
import {
    HOST
} from '../utils/host'

export function getBanners() {
    const url = HOST + '/banner'
    return axios.get(url)
}

export function getRecommendMusic(params) {
    const url = HOST + '/top/playlist/highquality'
    return axios.get(url,{params:params})
}