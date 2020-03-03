import axios from 'axios'
import {
    HOST
} from '../utils/config'

export function getPlayListCategorys(){
    const url = HOST + '/playlist/catlist'
    return axios.get(url)
}

export function getPlayListByCat(limit,cat){
    const url = HOST + `/top/playlist?limit=${limit}&cat=${cat}`
    return axios.get(url)
}