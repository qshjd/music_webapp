<template>
    <transition name="fade">
        <div class="play-list"></div>
    </transition>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  components: {},
  methods: {}
};
</script>

<style lang='scss' scoped>
@import "../assets/css/var.scss";
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter,
.fade-leave-to {
  transform: translate3d(30%, 0, 0);
  opacity: 0;
}
.play-list {
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  background: $bg_color;
  z-index: 100;
}
</style>
