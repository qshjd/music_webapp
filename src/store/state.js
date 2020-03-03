import {loadSearch,loadLove,loadCurrent} from '../common/cache'

const state = {
    //当前歌单信息
    musicListInfo:{},
    //当前排行榜信息
    rankListInfo:{},
    //历史记录
    searchHistory:loadSearch(),
    //收藏
    love:loadLove(),
    current:loadCurrent(),
    /**播放器 */
    
    //显示播放器
    showPlayer:false,
    //播放器是否展开
    expand:true,
    //当前播放歌曲信息
    currentMusic:{},
    //当前播放音频的url
    audioUrl:'',
    //当前播放索引
    audioIndex:0,
    //无法获取该url
    requestError:false
}

export default state