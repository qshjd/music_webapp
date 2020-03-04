<template>
  <!-- <transition name="fade"> -->
  <div class="search">
    <div class="header" ref="header">
      <img :src="backIcon" class="back-icon" @click="back">
      <div class="title">{{headerTitle}}</div>
    </div>
    <cube-scroll
      ref="scroll"
      :data="Musics"
      class="list"
      :listen-scroll="listenScroll"
      @scroll="onScrollHandle"
    >
      <div class="cover" :style="backImg" ref="bgImage">
        <div class="text">
          <h2 class="cover-title">{{title}}</h2>
          <div class="play-count">
            <img :src="playIcon1" class="icon">
            {{playCount}}
          </div>
        </div>
      </div>
      <div class="song-scroll-list">
        <div class="sequence-play" v-show="Musics.length" ref="sequence">
          <img :src="playIcon2" class="play-icon2">
          <span class="text">播放全部</span>
          <span class="count">(共{{Musics.length}}首)</span>
        </div>
        <Songs :songs="Musics" @select="selectItem"/>
      </div>
    </cube-scroll>
    <div class="loading" v-show="!Musics.length">
      <Loading/>
    </div>
  </div>
  <!-- </transition> -->
</template>

<script>
import Songs from "../components/Songs";
import Loading from "@/components/Loading";
import { mapGetters, mapActions } from "vuex";
import { getMusics } from "../api/find";
import { formatPlayListSong } from "../common/formatsong";
export default {
  name: "",
  data() {
    return {
      backIcon: require("../imgs/back_light.png"),
      playIcon1: require("../imgs/play.png"),
      playIcon2: require("../imgs/play2.png"),
      Musics: [],
      pullDownY: 0, //当前窗口位置
      imageHeight: 0, //封面大小
      headerTitle: "歌单"
    };
  },
  components: {
    Songs,
    Loading
  },
  created() {
    // console.log("......", this.Musics.length);
    this._getMusics(this.musicListInfo.id);
    this.listenScroll = true;
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight;
  },
  computed: {
    ...mapGetters(["musicListInfo"]),
    //封面url
    backImg() {
      return `background:url(${this.musicListInfo.picUrl})`;
    },
    //歌单标题
    title() {
      return this.musicListInfo.name;
    },
    playCount() {
      if (!this.musicListInfo.playCount) {
        return;
      }
      if (this.musicListInfo.playCount < 1e5) {
        return Math.floor(this.musicListInfo.playCount);
      } else {
        return Math.floor(this.musicListInfo.playCount / 10000) + "万";
      }
    }
  },
  watch: {},
  methods: {
    back() {
      this.$router.back();
    },
    //初始化获取歌单详情
    _getMusics(id) {
      console.log(id);
      if (!id) {
        this.$router.push("/find");
        return;
      }
      getMusics(id).then(res => {
        this.Musics = res.data.playlist.tracks.map(item => {
          return formatPlayListSong(item)
        });
        // console.log('格式化后：',this.Musics)
      });
    },
    //滚动监视
    onScrollHandle(pos) {
      this.pullDownY = pos.y;
      if (-this.pullDownY > this.imageHeight - 60) {
        this.$refs.header.style.background = "rgb(212, 68, 57)";
        this.headerTitle = this.musicListInfo.name;
      } else {
        this.$refs.header.style.background = "";
        this.headerTitle = "歌单";
      }
    },
    //选择歌曲
    selectItem(index, item) {
      this.selectPlay(item);
      this.changeAudioUrl(item.id)
    },
    ...mapActions(["selectPlay","changeAudioUrl"])
  }
};
</script>

<style scoped lang="scss">
@import "../assets/css/var.scss";
@import "../assets/css/mixin.scss";
// .fade-enter-active,
// .fade-leave-active {
//   transition: all 0.3s;
// }
// .fade-enter,
// .fade-leave-to {
//   transform: translate3d(30%, 0, 0);
//   opacity: 0;
// }

.search {
  position: fixed;
  z-index: 200;
  width: 100%;
  top: -60px;
  bottom: 0;
  left: 0;
  right: 0;
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    z-index: 100;
    display: flex;
    align-items: center;
    .back-icon {
      height: 40%;
      padding: 0 15px;
    }
    .title {
      font-size: $font_size_big;
      color: #ffffff;
      font-weight: 550;
      @include font-hidden()
    }
  }
  .list {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: $bg_color;
    overflow: hidden;
    .cover {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 70%;
      transform-origin: top;
      background-size: cover;
      background-position: 0 30%;
      .text {
        position: absolute;
        left: 10px;
        bottom: 20px;
        .cover-title {
          font-size: $font_size_big;
          color: #ffffff;
          font-weight: 600;
          overflow: hidden;
          @include font-hidden()
        }
        .play-count {
          height: 10px;
          display: flex;
          color: #ffffff;
          font-size: $font_size_small;
          margin-top: 10px;
          font-weight: 600;
          .icon {
            padding-right: 10px;
            height: 100%;
          }
        }
      }
    }

    .song-scroll-list {
      position: relative;
      width: 100%;
      top: -10px;
      background: $bg_color;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      .sequence-play {
        height: 40px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgb(228, 228, 228);
        .play-icon2 {
          height: 44%;
          padding: 0 20px;
        }
        .text {
          font-size: $font_size_big;
          color: $font_color;
        }
        .count {
          font-size: $font_size_big;
          color: $font_gray;
        }
      }
    }
  }
  .loading {
    position: absolute;
    width: 100%;
    top: 400px;
  }
}
</style>
