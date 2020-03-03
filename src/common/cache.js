import storage from 'good-storage'
const SEARCH_KEY = '__search__'
const LOVE_KEY = '__love__'
const CURRENT_KEY = '__current__'
//历史记录存储条数
const SEARCH_MAX_LEANGTH = 5
const LOVE_MAX_LENGTH = 20
const CURRENT_MAX_LENGTH = 20

//插入数据过滤：1.若此时已存满，则删除最后一条；2.重复的先删除原有的，再将它存到第一位
function insertFilter(searches,max,newItem){
    const index = searches.findIndex(item => item.id === newItem.id)
    // console.log(index)
    //无重复
    if(index === -1){
        if(max <= searches.length){
            //删除最后一个
            searches.pop()
            //将当前添加到第一个
            searches.unshift(newItem)
            return searches
        }else{
            searches.unshift(newItem)
            return searches
        }
    }else{
        console.log('重复。。')
        //有重复
        searches.splice(index,1)
        searches.unshift(newItem)
        return searches
    }
}
//添加模板函数
function save(type,max,newItem){
    let list = storage.get(type,[])
    let newList = insertFilter(list,max,newItem)
    storage.set(type,newList)
}
//删除模板函数
function deleteItem(key,choseDelete){
    let list = storage.get(key,[])
    const index = list.findIndex(item => item.id === choseDelete.id)
    if(index != -1){
        list.splice(index,1)
        storage.set(key,list)
    }
}

/**搜索历史相关 */
//获取历史
export function loadSearch(){
    return storage.get(SEARCH_KEY,[])
}
//存历史
export function saveSearch(newItem){
    save(SEARCH_KEY,SEARCH_MAX_LEANGTH,newItem)
}
//删除一条
export function deleteItemSearch(choseDelete){
    deleteItem(SEARCH_KEY,choseDelete)
}
//删除全部
export function deleteAllSearch(){
    storage.remove(SEARCH_KEY)
}

/**收藏相关 */
//获取收藏
export function loadLove(){
    return storage.get(LOVE_KEY,[])
}

//收藏歌曲
export function saveLove(newItem){
    save(LOVE_KEY,LOVE_MAX_LENGTH,newItem)
}
//删除一条收藏
export function deleteItemLove(choseDelete){
    deleteItem(LOVE_KEY,choseDelete)
}
//判断该歌曲是否已收藏，没有就存，有就删除
export function loveIsExist(newItem){
    let list = storage.get(LOVE_KEY,[])
    const index = list.findIndex(item => item.id === newItem.id)
    if(index != -1){
        console.log('取消收藏')
        deleteItemLove(newItem)
        return false
        //取消收藏
    }else{
        saveLove(newItem)
        return true
    }
}

//最近播放相关
export function loadCurrent(){
    return storage.get(CURRENT_KEY,[])
}

//存最近播放
export function saveCurrent(newItem){
    save(CURRENT_KEY,CURRENT_MAX_LENGTH,newItem)
}

export function playPre(){
    let list = storage.get(CURRENT_KEY,[])
    let current = list[0]
    let length = list.length
    let newList = list.slice(1,length)
    newList.push(current)
    storage.set(CURRENT_KEY,newList)
    return newList
}

export function playNext(){
    let list = storage.get(CURRENT_KEY,[])
    let length = list.length
    let current = list[length - 1]
    console.log('要播放：',current)
    list.pop()
    console.log(list)
    list.unshift(current)
    storage.set(CURRENT_KEY,list)
    return list
}





