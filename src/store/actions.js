import * as types from './mutation-types'
import {getSongUrl ,getSongDetail} from '../api/song'
import {SUCCESS_CODE} from '../utils/config'
import {formatPlayListSong } from '../common/formatsong'

export const selectPlay = ({ commit } , item)=>{
    let detail
    getSongDetail(item.id)
    .then(res => {
        detail = res.data.songs.map(song => {
            return formatPlayListSong(song)
        })
        commit(types.CHOOSE_CURRENT_SONG, detail[0])
    })
    
}

export const changeAudioUrl = ({ commit } , id) => {
    return getSongUrl(id)
    .then(res => {
        if (res.data.code === SUCCESS_CODE) {
            const url = res.data.data[0].url;
            if (url) {
                commit(types.CHANGE_AUDIO_URL,url)
                commit(types.REQUEST_URL_ERROR,false)
            }else{
                //暂停播放，提示信息
                commit(types.REQUEST_URL_ERROR,true)
            }
          }
    })
    .catch(err => {
        console.log(err)
        commit(types.REQUEST_URL_ERROR,true)
    })
}