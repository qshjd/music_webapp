<template>
    <div class="cover" :style="coverImg" >
        
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: "",
    data() {
        return {}
    },
    components: {},
    methods: {},
    computed: {
      ...mapGetters(['rankListInfo']),
      coverImg(){
          return `background-image:url(${this.rankListInfo.coverImgUrl})`
      }
  },
}
</script>

<style lang='scss' scoped>
.cover{
    width: 100%;
    height:700px;
    background-repeat:no-repeat;
    background-size: 100% 100%;
}
</style>
