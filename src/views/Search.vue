<template>
  <transition name="fade">
    <div class="search">搜索页</div>
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
}
.fade-enter,
.fade-leave-to {
  transform: translate3d(50%, 0, 0);
  opacity: 0;
}

.search {
  background: red;
  position: fixed;
  z-index: 100;
  width: 100%;
  top: 0;
  bottom: 0;
}
</style>
