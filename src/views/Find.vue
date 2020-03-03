<template>
  <div class="mine">
    <div class="slider" v-if="banner.length">
      <cube-slide ref="slide" :data="banner">
        <cube-slide-item
          v-for="(item, index) in banner"
          :key="index"
          @click.native="clickHandler(item, index)"
        >
          <img :src="item.imageUrl" class="banner-img">
        </cube-slide-item>
      </cube-slide>
    </div>
    <div class="icons">
      <img src="../imgs/recommend.png" class="icon" @click="gotoSuggest">
      <img src="../imgs/playlist.png" class="icon" @click="gotoPlayList">
      <img src="../imgs/rank.png" class="icon" @click="gotoRankPage">
      <img src="../imgs/radio.png" class="icon" @click="gotoSuggest">
    </div>
    <div class="icon-des">
      <span class="des">每日推荐</span>
      <span class="des">歌单</span>
      <span class="des">排行榜</span>
      <span class="des">电台</span>
    </div>
    <div class="recommend">
      <div class="list_title_small">推荐歌单</div>
      <div class="list_title">
        <span>为你精挑细选</span>
        <div class="goto_playlist" @click="gotoPlayList">查看更多</div>
      </div>
      <List :playList="playList" @gotoMusicList="gotoMusicList"/>
    </div>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getBanners, getPlayList } from "../api/find";
import { mapMutations } from "vuex";
import List from "@/components/List.vue";

export default {
  name: "Mine",
  components: {
    List
  },
  data() {
    return {
      banner: [],
      playList: []
    };
  },
  created() {
    this._getBanner();
    this._getPlayList();
  },
  methods: {
    //将此歌单对应的信息：歌单名称、封面地址等等存到store，以便歌单详情列表获取
    ...mapMutations({
      setMusicList: "SET_MUSIC_LIST_INFO"
    }),
    //获取轮播图
    _getBanner() {
      getBanners().then(res => {
        this.banner = res.data.banners;
      });
    },
    //获取歌单列表
    _getPlayList() {
      getPlayList(9).then(res => {
        // console.log("*.*", res);
        this.playList = res.data.result;
      });
    },
    //进入歌单详情页
    gotoMusicList(item) {
      this.$router.push({ path: `/find/${item.id}` });
      //存到store
      this.setMusicList(item);
    },
    //进入每日推荐
    gotoSuggest() {
      this.$createToast({
        type: "warn",
        time: 1000,
        txt: "开发中"
      }).show();
    },
    //进入排行榜
    gotoRankPage() {
      this.$router.push({ path: "/rank" });
    },
    //进入歌单
    gotoPlayList() {
      this.$router.push({ path: "/playlist" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/var";
@import "../assets/css/mixin.scss";

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter,
.fade-leave-to {
  transform: translate3d(30%, 0, 0);
  opacity: 0;
}
.mine {
  width: 92%;
  position: fixed;
  top: 60px;
  bottom: 0;
  left: 4%;
  overflow-x: hidden;
  overflow-y: auto;
  .slider {
    height: 130px;
    border-radius: 5px;
    overflow: hidden;
    .banner-img {
      height: 100%;
    }
  }
  .icons {
    margin-top: 10px;
    display: flex;
    height: 40px;
    justify-content: space-around;
    .icon {
      height: 100%;
    }
  }
  .icon-des {
    display: flex;
    font-size: 11px;
    color: $font_color;
    margin-top: 10px;
    .des {
      text-align: center;
      flex: 1;
    }
  }
  .recommend {
    margin-top: 20px;
    margin-bottom: 50px;
    .list_title_small {
      font-size: $font_size_small;
      color: $font_gray;
      height: 30px;
      line-height: 30px;
    }
    .list_title {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        line-height: 50px;
        font-size: $font_size_big;
        font-weight: 600;
      }
      .goto_playlist {
        display: inline;
        border: 1px solid #8a8a8a;
        padding: 4px 8px;
        font-size: $font_size_middle;
        letter-spacing: 0.5;
        color: $font_color;
        text-align: center;
        border-radius: 30px;
      }
    }
  }
}
</style>

