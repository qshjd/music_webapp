<template>
  <div class="mine">
    <cube-scroll ref="scroll" @pulling-up="onPullingUp">
      <div class="slider">
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
        <img src="../imgs/recommend.png" class="icon">
        <img src="../imgs/playlist.png" class="icon">
        <img src="../imgs/rank.png" class="icon">
        <img src="../imgs/radio.png" class="icon">
      </div>
      <div class="icon-des">
        <span class="des">每日推荐</span>
        <span class="des">歌单</span>
        <span class="des">排行榜</span>
        <span class="des">电台</span>
      </div>
      <ul class="recommend">
        <div class="list_title_small">推荐歌单</div>
        <div class="list_title">
          <span>为你精挑细选</span>
          <div class="goto_playlist">查看更多</div>
        </div>
        <ul>
          <li class="item" v-for="item in recommendMusic" :key="item.id">
            <img :src="item.coverImgUrl" class="pic" @click="gotoMusicList(item.id)">
            <p class="text">{{item.name}}</p>
            <p class="play-count">
              <img src="../imgs/play.png" class="icon">
              {{Math.floor(item.playCount / 10000) }}万
            </p>
          </li>
        </ul>
      </ul>
    </cube-scroll>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { getBanners, getRecommendMusic } from "../api/mine";

export default {
  name: "Mine",
  components: {
    // HelloWorld
  },
  data() {
    return {
      banner: [],
      recommendMusic: []
    };
  },
  created() {
    this._getBanner();
    this._getRecommendMusic();
  },
  methods: {
    //获取轮播图
    _getBanner() {
      getBanners({
        params: {
          limit: 6
        }
      }).then(res => {
        this.banner = res.data.banners;
      });
    },
    //获取歌单列表
    _getRecommendMusic() {
      getRecommendMusic({
        limit: 6
      }).then(res => {
        console.log(res);
        this.recommendMusic = res.data.playlists;
      });
    },
    //下拉加载数据
    onPullingUp() {
      console.log("触发。。。");
      const length = this.recommendMusic.length;
      const trackNumberUpdateTime = this.recommendMusic[length]
        .trackNumberUpdateTime;
      getRecommendMusic({
        limit: 6,
        before: trackNumberUpdateTime
      }).then(res => {
        console.log(res);
        this.recommendMusic = this.recommendMusic.concat(res.data.result);
      });
    },
    //进入歌单详情页
    gotoMusicList(id){
      this.$router.push({path:`/find/${id}`})
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/var";
.mine {
  width: 92%;
  margin: auto;
  height: 100%;
  .slider {
    height: 260px;
    border-radius: 10px;
    overflow: hidden;
    .banner-img {
      height: 100%;
    }
  }
  .icons {
    margin-top: 20px;
    display: flex;
    height: 85px;
    justify-content: space-around;
    .icon {
      height: 100%;
    }
  }
  .icon-des {
    display: flex;
    // justify-content: space-around;
    font-size: 22px;
    color: $font_color;
    margin-top: 20px;
    .des {
      text-align: center;
      flex: 1;
    }
  }
  .recommend {
    .list_title_small {
      font-size: 24px;
      color: $font_gray;
      height: 60px;
      line-height: 140px;
    }
    .list_title {
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        line-height: 120px;
        font-size: 32px;
        font-weight: 600;
      }
      .goto_playlist {
        display: inline;
        border: 1px solid #8a8a8a;
        padding: 10px 20px;
        font-size: 24px;
        letter-spacing: 0.5;
        color: $font_color;
        text-align: center;
        // line-height: 60px;
        border-radius: 50px;
      }
    }
  }
  .play-count {
    position: absolute;
    top: 10px;
    right: 20px;
    height: 20px;
    color: #ffffff;
    font-size: 16px;
    font-weight: 500;
    .icon {
      height: 100%;
    }
  }
  .item {
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    width: 33.3%;
    padding-right: 10px;
    overflow: hidden;
    .pic {
      width: 100%;
      height: 100%;
      border-radius: 6px;
    }
    .text {
      height: 80px;
      line-height: 40px;
      font-size: 24px;
      color: $font_color;
      overflow: hidden;
    }
  }
}
</style>

