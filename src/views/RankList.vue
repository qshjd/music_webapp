<template>
    <div class="rank-list">
        <Back @back="back" :headerTitle="rankListInfo.name" :bgcolor="color" ref="header" />
        <cube-scroll :data="Musics"  @scroll="onScrollHandle" :listen-scroll="listenScroll"  >
            <Cover/>
            <div class="song-scroll-list">
                <div class="sequence-play" v-show="Musics.length" ref="sequence">
                    <img :src="playIcon2" class="play-icon2">
                    <span class="text">播放全部</span>
                    <span class="count">(共{{Musics.length}}首)</span>
                </div>
                <Songs :songs="Musics" @select="selectItem"/>
            </div>
        </cube-scroll>
        
    </div>
</template>

<script>
import Back from "@/components/Back.vue";
import Cover from "@/components/Cover.vue";
import Songs from "@/components/Songs.vue";
import { formatPlayListSong } from "../common/formatsong";
import { mapGetters , mapActions} from "vuex";
export default {
  name: "",
  data() {
    return {
      title: "歌曲",
      color: "",
      playIcon2: require("../imgs/play2.png"),
      listenScroll:true,
      pullDownY: 0, //当前窗口位置
      imageHeight: 0, //封面大小
    };
  },
  components: {
    Back,
    Cover,
    Songs
  },
  computed: {
    ...mapGetters(["rankListInfo"]),
    Musics() {
      return this.rankListInfo.tracks.map(item => {
        return formatPlayListSong(item);
      });
    }
  },
  methods: {
      ...mapActions(["selectPlay","changeAudioUrl"]),
    back() {
      this.$router.back();
    },
    selectItem(index, item) {
      this.selectPlay(item);
      this.changeAudioUrl(item.id)
    },
    //滚动监视
    onScrollHandle(pos) {
      this.pullDownY = pos.y;
      if (-this.pullDownY > 240) {
        console.log('ok')
        this.$refs.header.changeRed()
      } else {
        this.$refs.header.changeWhite()
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/var.scss";
.rank-list {
  position: fixed;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: $bg_color;
  z-index: 300;
  .song-scroll-list {
    position: relative;
    width: 100%;
    top: -40px;
    background: $bg_color;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    .sequence-play {
      height: 40px;
      // z-index: 1000;
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
</style>
