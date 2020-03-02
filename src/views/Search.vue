<template>
  <transition name="fade">
    <div class="search">
      <Back @back="back" headerTitle>
        <cube-input
          v-model="value"
          :clearable="clearable"
          placeholder="请输入歌名或歌手"
          class="c-input"
          @input="handleInput"
        ></cube-input>
      </Back>
      <cube-scroll :options="options" @pulling-up="onPullingUp" ref="scroll">
        <div class="scroll-box">
          <div class="search-ctt" v-if="!showResult">
            <div class="hot-search">
              <p class="title">热门搜索</p>
              <div class="list">
                <span
                  v-for="(item,index) in hosts"
                  :key="index"
                  class="item"
                  @click="addToSearch(item)"
                >{{item.first}}</span>
              </div>
              <div class="history">
                <span class="title">搜索历史</span>
                <img :src="deleteAllIcon" class="delete-all" @click="deleteAll">
              </div>
              <ul>
                <li v-for="(item,index) in searchHistory" :key="index" class="history-box" @click="addHistoryToSearch(item)">
                  <span class="history-name">{{item.name}}</span>
                  <img :src="deleteIcon" @click.stop="deleteItem(item)" class="delete-item">
                </li>
              </ul>
            </div>
          </div>
          <div class="search-result" v-else>
            <ul>
              <li
                v-for="(item,index) in searchResult"
                :key="index"
                class="item-result"
                @click="selectItem(item)"
              >
                <p class="name">{{item.name}}</p>
                <p class="singer">{{item.singer}}</p>
              </li>
            </ul>
            <p v-show="noMore" class="loaded">加载完成</p>
          </div>
        </div>
      </cube-scroll>
      <Loading v-show="isLoadingResult && showResult"/>
    </div>
  </transition>
</template>

<script>
import Back from "@/components/Back.vue";
import Loading from "@/components/Loading.vue";
import { getHotList, getSearchResult } from "../api/search";
import { selectSongMixin } from "../common/mixins";
import { formatSearchSong } from "../common/formatsong";
import { mapGetters } from "vuex";
let timer; //防抖定时器
export default {
  mixins: [selectSongMixin],
  name: "",
  data() {
    return {
      deleteAllIcon: require("../imgs/deleteAll.png"),
      deleteIcon: require("../imgs/delete.png"),
      value: "",
      clearable: {
        visible: true,
        blurHidden: true
      },
      hosts: [],
      showResult: false,
      isLoadingResult: true,
      offset: 0,
      searchResult: [], //搜索结果（多条）
      loadingMore: false,
      noMore: false
    };
  },
  components: {
    Back,
    Loading
  },
  created() {
    this._getHotList();
  },
  computed: {
    ...mapGetters(["searchHistory"]),
    options() {
      return {
        // pullDownRefresh: this.onPullingDown,
        pullUpLoad: this.onPullingUp
      };
    }
  },
  methods: {
    back() {
      this.$router.back();
      this.value = ''
    },
    //热搜列表
    _getHotList() {
      getHotList().then(res => {
        if (res.data.code === 200) {
          this.hosts = res.data.result.hots;
        }
      });
    },
    //输入框
    handleInput(e) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        if (e) {
          this.showResult = true;
          getSearchResult(e, 0).then(res => {
            this.searchResult = res.data.result.songs.map(item => {
              return formatSearchSong(item);
            });
            if (this.searchResult.length < 30) {
              this.noMore = true;
            }
            this.isLoadingResult = false;
          });
        } else {
          this.showResult = false;
        }
      }, 400);
    },
    //上拉加载
    onPullingUp() {
      if (!this.loadingMore && !this.noMore) {
        this.loadingMore = true;
        setTimeout(() => {
          if (this.searchResult.length >= 30 && this.searchResult.length < 90) {
            this.offset = this.offset + 30;
            getSearchResult(this.value, this.offset)
              .then(res => {
                let arr = [];
                arr = res.data.result.songs.map(item => {
                  return formatSearchSong(item);
                });
                return arr;
              })
              .then(arr => {
                console.log("arr:", arr);
                this.searchResult = [...this.searchResult, ...arr];
                console.log("sea", this.searchResult);
                this.$refs.scroll.forceUpdate();
                this.loadingMore = false;
              })
              .catch(err => {
                console.log(err);
                this.$refs.scroll.forceUpdate();
              });
          } else {
            this.$refs.scroll.forceUpdate();
            this.noMore = true;
          }
        }, 1000);
      } else {
        console.log("加载");
        this.$refs.scroll.forceUpdate();
      }
    },
    //热门收索
    addToSearch(item) {
      this.value = item.first;
    },
    //记录搜索
    addHistoryToSearch(item){
      this.value = item.name
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/var.scss";
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
}
.fade-enter,
.fade-leave-to {
  transform: translate3d(50%, 0, 0);
  opacity: 0;
}

.search {
  background-color: $bg_color;
  position: fixed;
  z-index: 100;
  width: 100%;
  top: 0;
  bottom: 0;
  .c-input {
    height: 60%;
    width: 72%;
    font-size: $font_size_big;
    overflow: hidden;
  }
  .scroll-box {
    margin-bottom: 100px;
    .search-ctt {
      width: 92%;
      margin-top: 140px;
      margin-left: 4%;
      .hot-search {
        .title {
          line-height: 80px;
          font-size: $font_size_middle;
          color: $font_gray;
        }
        .list {
          width: 80%;
          .item {
            display: inline-block;
            font-size: $font_size_big;
            color: $font_color;
            border: 1px solid $border_color_gray;
            padding: 10px;
            border-radius: 10px;
            margin: 10px 10px 10px 0;
          }
        }
        .history {
          margin-top:20px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .delete-all {
            width: 40px;
            height: 40px;
          }
        }

        .history-box {
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .history-name{
            font-size: $font_size_big;
            color:$font_color;
          }
          .delete-item{
            width: 40px;
            height: 40px;
          }
        }
      }
    }
    .search-result {
      width: 100%;
      margin-top: 100px;
      .item-result {
        height: 120px;
        border-bottom: 1px solid $border_color_gray;
        padding-left: 4%;

        .name {
          height: 50%;
          line-height: 80px;
          width: 80%;
          font-size: $font_size_big;
          color: $font_color;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .singer {
          height: 50%;
          line-height: 40px;
          width: 80%;
          font-size: $font_size_small;
          color: $font_gray;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .loaded {
        font-size: $font_size_middle;
        color: $font_color;
        text-align: center;
        line-height: 80px;
        font-weight: 600;
      }
    }
  }
}
</style>
