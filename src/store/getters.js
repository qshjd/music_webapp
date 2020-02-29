
//当前选择歌单信息
export const musicListInfo = state => state.musicListInfo
//当前选择的排行榜歌曲信息
export const rankListInfo = state => state.rankListInfo

//获取当前播放器状态
export const showPlayer = state => state.showPlayer
//获取播放器的形态（是否展开）
export const expand = state => state.expand
//获取当前音频url
export const audioUrl = state => state.audioUrl

export const requestError = state => state.requestError