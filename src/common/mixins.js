import {
    mapActions,
    mapMutations
} from 'vuex'
import {
    saveSearch,
    deleteAllSearch,
    deleteItemSearch
} from '../common/cache'

export const selectSongMixin = {
    methods: {
        ...mapActions(["selectPlay", "changeAudioUrl", "addToHistory"]),
        ...mapMutations({
            deleteStoreSearch: 'DELETE_ALL_SEARCH',updateSearch: 'UPDATE_SEARCH'
        }),
        selectItem(item) {
            this.selectPlay(item);
            this.changeAudioUrl(item.id);
            saveSearch(item);
            this.updateSearch();
        },
        //清空搜索记录
        deleteAll() {
            const res = window.confirm('是否清空历史信息')
            if (res) {
                deleteAllSearch()
                this.deleteStoreSearch()
            }
        },
        //删除一条记录
        deleteItem(item) {
            deleteItemSearch(item)
            this.updateSearch();
        }
    }
}