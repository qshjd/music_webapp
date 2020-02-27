import axios from 'axios'
import {
    HOST
} from '../utils/config'

export function getSongUrl(id){
    const url = HOST + `/song/url?id=${id}`
    return axios.get(url)
}