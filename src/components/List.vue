<template>
  <div>
    <ul class="item-box">
      <li class="item" v-for="(item,index) in playList" :key="index">
        <img v-lazy="item.picUrl" class="pic" @click="gotoMusicList(item)">
        <p class="text">{{item.name}}</p>
        <div class="play-count">
          <div class="play-count-box">
            <img src="../imgs/play.png" class="icon">
            {{Math.floor(item.playCount / 10000) }}万
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    playList: {
      type: Array
    }
  },
  name: "",
  data() {
    return {};
  },
  components: {},
  methods: {
    gotoMusicList(item) {
      this.$emit("gotoMusicList", item);
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../assets/css/var.scss";
.item-box {
  margin-bottom: 50px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 10px;
  .item {
    margin-top: 5px;
    position: relative;
    .pic {
      width: 100%;
      border-radius: 4px;
    }
    .text {
      height: 40px;
      line-height: 20px;
      font-size: $font_size_small;
      color: $font_color;
      overflow: hidden;
    }
    .play-count {
      position: absolute;
      top: 5px;
      right: 10px;
      height: 12px;
      display: flex;
      align-items: center;
      .play-count-box {
        font-weight: 500;
        color: #ffffff;
        font-size: 10px;
        height: 100%;
        .icon {
          height: 80%;
        }
      }
    }
  }
}
</style>
