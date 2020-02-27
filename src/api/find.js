import axios from 'axios'
import {
    HOST
} from '../utils/config'

export function getBanners() {
    const url = HOST + '/banner'
    return axios.get(url)
}

export function getPlayList(count) {
    const url = HOST + `/personalized?limit=${count}`
    return axios.get(url)
}

//通过歌单id获取歌曲列表
export function getMusics(id){
    const url = HOST + `/playlist/detail?id=${id}`
    return axios.get(url)
}