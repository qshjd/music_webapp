<template>
    <transition name="fade">
        <div class="user">
            <header class="top">
                <img src="../imgs/back_light.png" class="back-icon" @click="back">
                <cube-tab-bar v-model="selectedLabel" show-slider class="slider">
                    <cube-tab v-for="(item, index) in tabs" :label="item.label" :key="index"></cube-tab>
                </cube-tab-bar>
            </header>
            <cube-tab-panels v-model="selectedLabel"  class="list">
                <cube-tab-panel v-for="(item,index) in tabs" :label="item.label" :key="item.label">

                    <Songs :songs="love" @select="selectItem" v-show="index == 0"/>
                    <Songs :songs="current" @select="selectItem" v-show="index == 1" />
                </cube-tab-panel>
            </cube-tab-panels>
        </div>
    </transition>
</template>

<script>
import Songs from "@/components/Songs.vue";
// import { loadLove, loadCurrent } from "../common/cache";
import { mapState ,mapActions} from "vuex";
export default {
  name: "",
  data() {
    return {
      selectedLabel: "我的收藏",
      tabs: [
        {
          label: "我的收藏",
          ctt: []
        },
        {
          label: "最近播放",
          ctt: []
        }
      ]
    };
  },
  components: {
    Songs
  },
  created() {
    this._loadLove();
  },
  computed: {
    ...mapState(["love","current"])
  },
  methods: {
      ...mapActions(["selectPlay","changeAudioUrl"]),
    _loadLove() {
      console.log(this.love,this.current)
    },
    selectItem(index, item) {
      this.selectPlay(item);
      this.changeAudioUrl(item.id)
    },
    back() {
      this.$router.back();
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../assets/css/var.scss";
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
}
.fade-enter,
.fade-leave-to {
  transform: translate3d(0, 0, 30%);
  opacity: 0;
}
.user {
  background-color: $bg_color;
  position: fixed;
  z-index: 100;
  width: 100%;
  top: 0;
  bottom: 0;
  .top {
    height: 50px;
    display: flex;
    align-items: center;
    background: $theme_color;
    .back-icon {
      height: 20px;
      width: 20px;
      padding: 0 20px;
    }
    .slider {
      left: 5%;
      width: 60%;
      height: 80%;
      font-size: $font_size_big;
    }
  }
  .list{
    width: 100%;
    position: fixed;
    top:50px;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
