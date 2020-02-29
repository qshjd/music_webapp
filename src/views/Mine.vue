<template>
  <div class="mine">
    <!-- <cube-scroll ref="scroll" :data="List">
      <div class="about">
        <ul>
          <li v-for="item in List" :key="item.id" class="item">
            <h1>{{item.text}}</h1>
          </li>
        </ul>
      </div>
    </cube-scroll> -->
    该功能未完成
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
// import Test from '@/components/Test/test.vue'

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
  position: absolute;
  bottom: -100px;
  // overflow: hidden;
  width: 100%;
  top:188px;
  text-align: center;
  .item{
    height: 200px;
    border: 1px solid #000;
  }
}
</style>

