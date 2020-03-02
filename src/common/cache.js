import storage from 'good-storage'
const SEARCH_KEY = '__search__'
//历史记录存储条数
const SEARCH_MAX_LEANGTH = 5
export function loadSearch(){
    return storage.get(SEARCH_KEY,[])
}

//插入数据过滤：1.若此时已存满，则删除最后一条；2.重复的先删除原有的，再将它存到第一位
function insertFilter(searches,max,newItem){
    const index = searches.findIndex(item => item === newItem)
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
        //有重复
        searches.splice(index,1)
        searches.unshift(newItem)
        return searches
    }
    
}

export function saveSearch(newItem){
    let searches = storage.get(SEARCH_KEY,[])
    let newSearches = insertFilter(searches,SEARCH_MAX_LEANGTH,newItem)
    storage.set(SEARCH_KEY,newSearches)
}

export function deleteAllSearch(){
    storage.remove(SEARCH_KEY)
}

export function deleteItemSearch(deleteItem){
    let searches = storage.get(SEARCH_KEY,[])
    const index = searches.findIndex(item => item.id === deleteItem.id)
    if(index != -1){
        searches.splice(index,1)
    }
    storage.set(SEARCH_KEY,searches)
}