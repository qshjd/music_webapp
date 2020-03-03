<template>
  <div class="player" v-show="showPlayer">
    <transition name="full">
      <div class="normal-player" v-show="expand">
        <img :src="closeIcon" class="close-icon" @click="close">
        <div class="text">
          <p class="name">{{currentMusic.name}}</p>
          <p class="singer">{{currentMusic.singer}}</p>
        </div>
        <img :src="currentMusic.imgUrl" class="imageBig">
        <div class="action-icons">
          <div class="flex-box">
            <img :src="replayIcon" class="icon" @click="replay">
            <img :src="preIcon" class="icon" style="transform: rotate(180deg);" @click="playPreAudio">
            <img :src="centerIcon" class="icon" @click="changePlay">
            <img :src="preIcon" class="icon" @click="playNextAudio">
            <img :src="collectionIcon" class="icon" @click="saveSong">
          </div>
        </div>
      </div>
    </transition>
    <div class="mini-player" v-show="!expand">
      <div class="mini-box" @click="open">
        <img :src="currentMusic.imgUrl" class="image">
        <div class="text">
          <p class="name">{{currentMusic.name}}</p>
          <p class="singer">{{currentMusic.singer}}</p>
        </div>
        <button @click.stop="start">播放</button>
        <button @click.stop="stop">暂停</button>
        <audio ref="audio" :src="audioUrl" autoplay @ended="end"></audio>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters ,mapActions} from "vuex";
import { loadLove, loveIsExist  ,playPre ,playNext} from "../common/cache";
export default {
  name: "",
  data() {
    return {
      isPlaying: true,
      closeIcon: require("../imgs/close.png"),
      replayIcon: require("../imgs/replay.png"),
      preIcon: require("../imgs/next_pre.png"),
      centerIcon: require("../imgs/start.png"),
      collectionIcon: require("../imgs/collection.png")
    };
  },
  components: {},
  created() {
    this.isLove();
  },
  mounted() {
    
  },
  methods: {
    ...mapMutations({
      openNormalPlayer: "SET_OPEN_STATUS",
      updateLove: "UPDATE_LOVE",
      updateCurrent:"UPDATE_CURRENT"
    }),
    ...mapActions(["changeAudioUrl","selectPlay"]),
    //停止播放
    stop() {
      const audio = this.$refs.audio;
      audio.pause();
      this.isPlaying = false;
    },
    //继续播放
    start() {
      const audio = this.$refs.audio;
      audio.play();
      this.isPlaying = true;
    },
    //从头播放
    replay() {
      const audio = this.$refs.audio;
      audio.currentTime = 0;
    },
    //展开播放器
    open() {
      this.openNormalPlayer(true);
      console.log("click");
    },
    changePlay() {
      if (this.isPlaying) {
        const audio = this.$refs.audio;
        audio.pause();
        this.isPlaying = false;
      } else {
        const audio = this.$refs.audio;
        audio.play();
        this.isPlaying = true;
      }
    },
    //收起
    close() {
      this.openNormalPlayer(false);
    },
    showLoveIcon(status) {
      if (status) {
        this.updateLove();
        this.collectionIcon = require("../imgs/collection_selected.png");
      } else {
        this.updateLove();
        this.collectionIcon = require("../imgs/collection.png");
      }
    },
    //显示已收藏或未收藏
    isLove() {
      const list = loadLove();
      //判断当前歌曲是否已收藏
      const index = list.findIndex(item => item.id === this.currentMusic.id);
      if(index === -1){
        this.showLoveIcon(false);
      }else{
        this.showLoveIcon(true);
      }
      
    },
    //收藏歌曲
    saveSong() {
      let status = loveIsExist(this.currentMusic);
      this.showLoveIcon(status);
    },
    //播放上一首
    playPreAudio(){
      const newList = playPre()
      this.selectPlay(newList[0])
      this.changeAudioUrl(newList[0].id)
      //更新vuex中的最近播放
      this.updateCurrent()
    },
    //播放下一首
    playNextAudio(){
      const newList = playNext()
      this.selectPlay(newList[0])
      this.changeAudioUrl(newList[0].id)
      //更新vuex中的最近播放
      this.updateCurrent()
    },
    //播放完毕回调
    end(){
      console.log('放完一首啦！！！')
      this.playNextAudio()
    }
  },
  computed: {
    ...mapState(["showPlayer", "expand", "currentMusic"]),
    ...mapGetters(["audioUrl", "requestError"])
  },
  //监听数据变动
  watch: {
    requestError(newUrl, oldUrl) {
      console.log(newUrl, oldUrl);
      if (newUrl != oldUrl && newUrl === true) {
        //获取出错，停止播放并提示
        this.stop();
        const toast = this.$createToast({
          time: 1500,
          txt: "该歌曲暂无资源",
          type: "error"
        });
        toast.show();
      }
    },
    isPlaying(newState, oldState) {
      console.log(newState, oldState);
      if (!newState) {
        this.centerIcon = require("../imgs/stop.png");
      } else {
        this.centerIcon = require("../imgs/start.png");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/var.scss";
@import "../assets/css/mixin.scss";
.player {
  .full-enter-active,
  .full-leave-active {
    transition: all 0.3s;
  }
  .full-enter,
  .full-leave-to {
    transform: translate3d(0, 30%, 0);
    opacity: 0;
  }
  .normal-player {
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0;
    background: #607d8b;
    // opacity: .9;
    z-index: 200;
    .close-icon {
      position: absolute;
      height: 25px;
      transform: rotate(180deg);
      top: 10px;
      left: 10px;
    }
    .text {
      position: absolute;
      top: 10px;
      left: 25%;
      right: auto;
      height: 60px;
      width: 50%;
      // border: 1px solid #000;
      overflow: hidden;
      .name {
        height: 20px;
        font-size: $font_size_big;
        color: #f1f1f1;
        text-align: center;
        font-weight: 600;
        @include font_hidden()
      }
      .singer {
        color: #f1f1f1;
        text-align: center;
        font-size: $font_size_middle;
        line-height: 20px;
      }
    }
    .imageBig {
      width: 70%;
      margin-left: 11%;
      margin-top: 40%;
      border-radius: 90%;
      overflow: hidden;
      border: 15px solid #78909c;
    }
    .action-icons {
      width: 80%;
      height: 60px;
      left: 10%;
      position: absolute;
      bottom: 10%;
      .flex-box {
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon {
          height: 50%;
        }
      }
    }
  }
  .mini-player {
    z-index: 500;
    width: 100%;
    background: rgba(255, 255, 255, 0.85);
    position: fixed;
    bottom: 0;
    height: 50px;
    border-top: 1px solid rgb(228, 228, 228);
    .mini-box {
      display: flex;
      align-items: center;
      height: 100%;
      .image {
        height: 76%;
        border-radius: 90%;
        overflow: hidden;
        margin: 0 20px;
      }
      .text {
        width: 50%;
        height: 60%;
        color: $font_color;
        overflow: hidden;
        .name,
        .singer {
          @include font_hidden();
          width: 60%;
          height: 60%;
          line-height: 13px;
          font-size: $font_size_middle;
        }
        .singer {
          height: 40%;
          @include font_hidden();
          font-size: $font_size_small;
        }
      }
    }
  }
}
</style>
