<template>
    <div class="back-header" :style="bgcolor">
        <div class="back-box">
            <img :src="backIcon" class="back-icon" @click="back">
            <div class="title">{{headerTitle}}</div>
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
  height: 100px;
  // background: $theme_color;
  z-index:300;
  .back-box {
    display: flex;
    align-items: center;
    height: 100%;
    .back-icon {
      height: 40%;
      padding: 0 30px;
    }
    .title {
      font-size: 30px;
      color: #ffffff;
      font-weight: 550;
      overflow: hidden;
    }
  }
}
</style>
