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
            deleteStoreSearch: 'DELETE_ALL_SEARCH',
            updateSearch: 'UPDATE_SEARCH'
        }),
        selectItem(item) {
            this.selectPlay(item);
            this.changeAudioUrl(item.id);
            saveSearch(item);
            this.updateSearch();
        },
        //清空搜索记录
        deleteAll() {
            this.$createDialog({
                type: 'confirm',
                icon: 'cubeic-alert',
                title: '确定清空历史记录？',
                confirmBtn: {
                    text: '确定按钮',
                    active: true,
                    disabled: false,
                    href: 'javascript:;'
                },
                cancelBtn: {
                    text: '取消按钮',
                    active: false,
                    disabled: false,
                    href: 'javascript:;'
                },
                onConfirm: () => {
                    deleteAllSearch()
                    this.deleteStoreSearch()
                    this.$createToast({
                        type: 'warn',
                        time: 1000,
                        txt: '删除成功'
                    }).show()
                },
                onCancel: () => {
                    this.$createToast({
                        type: 'warn',
                        time: 1000,
                        txt: '取消'
                    }).show()
                }
            }).show()
        },
        //删除一条记录
        deleteItem(item) {
            deleteItemSearch(item)
            this.updateSearch();
        }
    }
}