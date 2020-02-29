import axios from 'axios'
import {
    HOST
} from '../utils/config'


export function getRank(idx){
    const url = HOST + `/top/list?idx=${idx}`
    return axios.get(url)
}