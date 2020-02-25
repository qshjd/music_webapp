<template>
  <div id="app">
    <Toptab />
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
import Toptab from "@/components/topTab/tab";
export default {
  components: {
    Toptab
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
#app {
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
