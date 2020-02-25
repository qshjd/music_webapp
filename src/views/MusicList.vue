<template>
    <transition name="fade">
        <div class="search">搜索页</div>
    </transition>
</template>

<script>
export default {
    name: "",
    data() {
        return {}
    },
    components: {},
    methods: {}
}
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter,
.fade-leave-to {
  transform: translate3d(30%,0, 0);
  opacity: 0;
}

.search {
  background: red;
  position: fixed;
  z-index: 100;
  width: 100%;
  top: 0;
  bottom: 0;
  left:0;
  right:0;
}
</style>
