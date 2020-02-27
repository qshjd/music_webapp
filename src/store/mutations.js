import * as types from './mutation-types'

const mutations = {
    [types.SET_MUSIC_LIST_INFO](state,info){
        state.musicListInfo = info
    },
    [types.CHOOSE_CURRENT_SONG](state,item){
        //显示播放器
        state.showPlayer = true
        //将选择歌曲的信息存进当前歌曲
        state.currentMusic = item
    },
    [types.SET_OPEN_STATUS](state,status){
        state.expand = status
    },
    [types.CHANGE_AUDIO_URL](state,url){
        state.audioUrl = url
    },
    [types.REQUEST_URL_ERROR](state,status){
        state.requestError = status
    }
}

export default mutations