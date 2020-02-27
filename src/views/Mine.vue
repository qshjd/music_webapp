<template>
  <div class="mine">
    <cube-scroll ref="scroll" :data="List">
      <div class="about">
        <ul>
          <li v-for="item in List" :key="item.id" class="item">
            <h1>{{item.text}}</h1>
          </li>
        </ul>
      </div>
    </cube-scroll>
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
        {id:1,text:"This is an about page"},
        {id:2,text:"This is an about page"},
        {id:3,text:"This is an about page"},
        {id:4,text:"This is an about page"},
        {id:5,text:"This is an about page"},
        {id:6,text:"This is an about page"},
        {id:7,text:"This is an about page"},
        {id:8,text:"This is an about page"},
        {id:9,text:"This is an about page"},
        {id:10,text:"This is an about page"},
        {id:11,text:"This is an about page"},
        {id:12,text:"This is an about page"},
        {id:13,text:"This is an about page"},
        {id:14,text:"This is an about page"},
        {id:15,text:"This is an about page"},
        {id:16,text:"This is an about page"},
        {id:17,text:"This is an about page"},
        {id:18,text:"This is an about page"},
        {id:19,text:"This is an about page"},
        {id:20,text:"This is an about page"},
        {id:21,text:"This is an about page"},
        {id:22,text:"This is an about page"},
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
  top:88px;
  .item{
    height: 200px;
    border: 1px solid #000;
  }
}
</style>

