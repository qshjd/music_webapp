<template>
  <div id="app">
    <Toptab />
    <keep-alive>
      <router-view />
    </keep-alive>
    <Player/>
  </div>
</template>
<script>
import Toptab from "@/components/topTab/tab";
import Player from '@/components/Player'
export default {
  components: {
    Toptab,
    Player
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
  ::-webkit-scrollbar{
    width: 0 !important
  }
}
</style>
