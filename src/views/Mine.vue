<template>
  <div class="mine">
      <div class="about">
        <ul>
          <li v-for="(item,index) in List" :key="index" class="item">
            <h1>{{item.text}}</h1>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
// import Test from '@/components/Test/test.vue'
// import {loadSearch} from '../common/cache'
export default {
  name: "Find",
  components: {
    // Test/
  },
  data() {
    return {
      List: [
       ]
    };
  }
};
</script>

<style lang="scss" scoped>
.mine {
  position: fixed;
  bottom:0;
  // height: 600px;
  width: 100%;
  top:188px;
  text-align: center;
  left:0;
  right:0;
  overflow-y: auto;
  overflow-x: hidden;
  
  .item{
    height: 200px;
    border: 1px solid #000;
  }
}
</style>

