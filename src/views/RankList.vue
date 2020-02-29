<template>
    <div class="rank-list">
        <Back @back="back" :headerTitle="rankListInfo.name" :bgcolor="color" />
        <cube-scroll :data="Musics">
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
      playIcon2: require("../imgs/play2.png")
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
    top: -20px;
    background: $bg_color;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    .sequence-play {
      height: 80px;
      z-index: 1000;
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgb(228, 228, 228);
      .play-icon2 {
        height: 44%;
        padding: 0 20px;
      }
      .text {
        font-size: 32px;
        color: $font_color;
      }
      .count {
        font-size: 28px;
        color: $font_gray;
      }
    }
  }
}
</style>
