import axios from 'axios'
import {
    HOST
} from '../utils/config'

export function getHotList(){
    const url = HOST + '/search/hot'
    return axios.get(url)
}