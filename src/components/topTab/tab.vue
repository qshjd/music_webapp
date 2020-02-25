<template>
  <div class="top-tab">
    <div class="tab-item">
      <img src="../../imgs/open.png" class="icon" />
    </div>
    <router-link tag="div" class="tab-item word" to="/mine">
      <span>我的</span>
    </router-link>
    <router-link tag="div" class="tab-item word" to="/find">
      <span>发现</span>
    </router-link>
    <router-link tag="div" class="tab-item" :to="{ path: '/search' }">
      <img src="../../imgs/search.png" class="icon2" />
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
  height: 100px;
  // border: 1px solid #000;
  display: flex;
  font-size: 32px;
  align-items: center;
  .tab-item {
    flex: 1;
    text-align: center;
    .icon,
    .icon2 {
      width: 40px;
      height: 40px;
      padding: 20px;
    }
  }

  .word {
    color: #8a8a8a;
    &.router-link-exact-active {
      color: #2e3131;
      font-size: 36px;
      font-weight: 600;
    }
  }
}
</style>
