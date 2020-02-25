<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Test/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Test from '@/components/Test/test.vue'

export default {
  name: "Find",
  components: {
    Test
  }
};
</script>
