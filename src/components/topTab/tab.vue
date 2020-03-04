<template>
  <div class="top-tab">
    <router-link tag="div" class="tab-item" :to="{ path: '/user' }">
      <img src="../../imgs/open.png" class="icon">
    </router-link>
    <router-link tag="div" class="tab-item word" to="/mine">
      <span>我的</span>
    </router-link>
    <router-link tag="div" class="tab-item word" to="/find">
      <span>发现</span>
    </router-link>
    <router-link tag="div" class="tab-item" :to="{ path: '/search' }">
      <img src="../../imgs/search.png" class="icon2">
    </router-link>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      icon1: open
    };
  },
  components: {},
  methods: {}
};
</script>

<style scoped lang="scss">
.top-tab {
  width: 100%;
  height: 50px;
  display: flex;
  font-size: 16px;
  align-items: center;
  background: #ffffff;
  .tab-item {
    flex: 1;
    text-align: center;
    .icon,
    .icon2 {
      width: 20px;
      height: 20px;
      padding: 10px;
    }
  }

  .word {
    color: #8a8a8a;
    &.router-link-exact-active {
      color: #2e3131;
      font-size: 18px;
      font-weight: 600;
    }
  }
}
</style>
