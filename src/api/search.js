import axios from 'axios'
import {
    HOST
} from '../utils/config'

export function getHotList(){
    const url = HOST + '/search/hot'
    return axios.get(url)
}

export function getSearchResult(name,page){
    const url = HOST + `/search?keywords=${name}&offset=${page}`
    return axios.get(url)
}

export function getSuggestResult(name){
    const url = HOST + `/search/suggest?keywords=${name}&type=mobile`
    return axios.get(url)
}