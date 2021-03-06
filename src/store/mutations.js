import * as types from './mutation-types'
import { loadSearch, loadLove ,loadCurrent} from '../common/cache';

const mutations = {
    [types.SET_MUSIC_LIST_INFO](state,info){
        state.musicListInfo = info
    },
    [types.SET_RANK_LIST_INFO](state,info){
        state.rankListInfo = info
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
    },
    [types.DELETE_ALL_SEARCH](state){
        state.searchHistory = []
    },
    [types.UPDATE_SEARCH](state){
        state.searchHistory = loadSearch()
        console.log('xxx')
    },
    [types.UPDATE_LOVE](state){
        state.love = loadLove()
    },
    [types.UPDATE_CURRENT](state){
        state.current = loadCurrent()
    }
}

export default mutations