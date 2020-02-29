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
                        <img :src="preIcon" class="icon" style="transform: rotate(180deg);">
                        <img :src="centerIcon" class="icon" @click="changePlay">
                        <img :src="preIcon" class="icon">
                        <img :src="collectionIcon" class="icon">
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
                <!-- <progress-circle value="50" max="100"></progress-circle>  -->
                <audio ref="audio" :src="audioUrl" autoplay></audio>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  name: "",
  data() {
    return {
      isPlaying:true,
      closeIcon: require("../imgs/close.png"),
      replayIcon: require("../imgs/replay.png"),
      preIcon: require("../imgs/next_pre.png"),
      centerIcon: require("../imgs/start.png"),
      collectionIcon: require("../imgs/collection.png")
    };
  },
  components: {},
  methods: {
    ...mapMutations({ openNormalPlayer: "SET_OPEN_STATUS" }),
    //停止播放
    stop() {
      const audio = this.$refs.audio;
      audio.pause();
      this.isPlaying = false
    },
    //继续播放
    start() {
      const audio = this.$refs.audio;
      audio.play();
      this.isPlaying = true
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
    changePlay(){
        if(this.isPlaying){
            const audio = this.$refs.audio;
            audio.pause();
            this.isPlaying = false
        }else{
            const audio = this.$refs.audio;
            audio.play();
            this.isPlaying = true
        }
    },
    //收起
    close() {
      this.openNormalPlayer(false);
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
    isPlaying(newState){
        if(newState){
            this.centerIcon = require("../imgs/stop.png")
        }else{
            this.centerIcon = require("../imgs/start.png")
        }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/var.scss";
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
      height: 50px;
      transform: rotate(180deg);
      top: 20px;
      left: 20px;
    }
    .text {
      position: absolute;
      top: 20px;
      left: 25%;
      right: auto;
      height: 120px;
      width: 50%;
      // border: 1px solid #000;
      overflow: hidden;
      .name {
        font-size: 32px;
        color: #f1f1f1;
        text-align: center;
        font-weight: 600;
      }
      .singer {
        color: #f1f1f1;
        text-align: center;
        font-size: 24px;
        line-height: 40px;
      }
    }
    .imageBig {
      //   height: 500px;
      width: 70%;
      margin-left: 11%;
      margin-top: 40%;
      border-radius: 90%;
      overflow: hidden;
      border: 30px solid #78909c;
    }
    .action-icons {
      width: 80%;
      height: 120px;
      left: 10%;
      position: absolute;
      //   border: 1px solid #000;
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
    z-index: 2000;
    width: 100%;
    background: rgba(255, 255, 255, 0.85);
    position: fixed;
    bottom: 0;
    height: 100px;
    border-top: 1px solid rgb(228, 228, 228);
    .mini-box {
      display: flex;
      align-items: center;
      height: 100%;
      .image {
        height: 76%;
        border-radius: 90%;
        overflow: hidden;
        margin: 0 30px;
      }
      .text {
        width: 50%;
        height: 50%;
        color: $font_color;
        overflow: hidden;
        .name,
        .singer {
          width:60%;
          height: 50%;
          line-height: 25px;
          font-size: 26px;
        }
        .singer {
          font-size: 22px;
        }
      }
    }
  }
}
</style>
