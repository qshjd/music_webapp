const state = {
    //当前歌单信息
    musicListInfo:{},
    //当前排行榜信息
    rankListInfo:{},
    /**播放器 */
    
    //显示播放器
    showPlayer:false,
    //播放器是否展开
    expand:false,
    //当前播放歌曲信息
    currentMusic:{},
    //当前播放音频的url
    audioUrl:'',
    //无法获取该url
    requestError:false
}

export default state