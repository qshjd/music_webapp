<template>
    <div class="back-header" :style="bgcolor" ref="top">
        <div class="back-box">
            <img :src="backIcon" class="back-icon" @click="back">
            <div class="title" :style="fontcolor">{{headerTitle}}</div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    headerTitle: {
      type: String,
      default: "标题"
    },
    bgcolor :{
      type:String,
      default:"background:rgb(212, 68, 57)"
    },
    fontcolor:{
      type:String,
      default:"color:#ffffff"
    }
  },
  name: "",
  data() {
    return {
      backIcon: require("../imgs/back_light.png")
    };
  },
  components: {},
  methods: {
    back() {
      this.$emit("back");
    },
    changeRed(){
      this.$refs.top.style.background = 'rgb(212, 68, 57)'
    },
    changeWhite(){
      this.$refs.top.style.background = ''
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../assets/css/var.scss";
.back-header {
  width: 100%;
  position: fixed;
  top: 0;
  height: 50px;
  // background: $theme_color;
  z-index:300;
  .back-box {
    display: flex;
    align-items: center;
    height: 100%;
    .back-icon {
      height: 40%;
      padding: 0 20px;
    }
    .title {
      font-size: $font_size_big;
      // color: #ffffff;
      font-weight: 550;
      overflow: hidden;
    }
  }
}
</style>
